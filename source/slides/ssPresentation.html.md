<div class='reveal'>
  <div class='slides'>

    <section data-markdown>
      <script type='text/template'>
        # Scaling Up Fast: Real-time Image Processing and Analytics using Spark

        Kevin Mader <br>
        1 July 2014, Spark Summit

        ![Paul Scherrer Institute](ssPresentation/ss-001.png)
        ![ETH Zurich](ssPresentation/ss-002.png)
        ![4Quant](ssPresentation/ss-003.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        * Imaging in 2014
        * Scaling Imaging
        * Scaling Post-processing
        * Towards Real-time Imaging
        * Beyond
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        ### Goal

        A modern image analysis infrastructure to make complex problems simple and handle the flood of data from current and next generation instruments

        ![](ssPresentation/ss-004.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging in 2014

        Ever more sensitive and faster hardware means image acquisition possibilities are growing rapidly

        * Light-sheet microscopy (see [talk](http://spark-summit.org/2014/talk/A-platform-for-large-scale-neuroscience) of Jeremy Freeman) produces images → 500MB/s
        * SRXTM (next slide!) images at (>1000fps) → 8GB/s
        * High-speed confocal images at (>200fps) → 78Mb/s
        * Many other examples
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging in 2014

        Images are only as useful as what you can do with them, the bottleneck isn&#39;t measurement speed, but analysis

        ![](ssPresentation/ss-005.png)

        *Adapted from: Sboner A,et. al. Genome Biology, 2011*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        The only technique which can do **all**

        * peer **deep** into large samples
        * achieve $<1\mu m$ isotropic spatial resolution
            * with **1.8mm** field of view
        * achieve **>10 Hz** temporal resolution

        ![](ssPresentation/ss-006.png)

        *[1] Mokso et al., J. Phys. D, 46(49),2013*
      </script>
    </section>

    <!-- TODO: 2 missed video  https://rawgit.com/4Quant/spark-summit-2014-presentation/master/ssPresentation.html#/3 -->
    <!-- <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        *Courtesy of M. Pistone at U. Bristol*
      </script>
    </section> -->
    
    <!-- TODO: 2 missed video  https://rawgit.com/4Quant/spark-summit-2014-presentation/master/ssPresentation.html#/4 -->
    <!-- <section data-markdown>
      <script type='text/template'>
        ## How tomography works
      </script>
    </section> -->
    
    <!-- TODO: 2 missed video  https://rawgit.com/4Quant/spark-summit-2014-presentation/master/ssPresentation.html#/5 -->
    <!-- <section data-markdown>
      <script type='text/template'>
        ## Reconstructing 3D Structures

        Filtered back-projection / Radon transform
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Reconstructing 3D Structures

        Segmentation and Post-processing
      </script>
    </section> -->

    <!-- TODO: missed video  https://rawgit.com/4Quant/spark-summit-2014-presentation/master/ssPresentation.html#/5 -->
    <section data-markdown>
      <script type='text/template'>
        ## Typical Large Scale Projects

        ### Zebra fish Phenotyping Project

        #### Collaboration with Keith Cheng, Ian Foster, Xuying Xin, Patrick La Raviere, Steve Wang

        1000s of samples of full adult animals, imaged at <br>
        0.74 $μm$ resolution: Images 11500 x 2800 x 628 ⟶ <br>
        20-40GVx / sample

        * Identification of single cells (no down-sampling)
        * Cell networks and connectivity
        * Classification of cell type
        * Registration with histology
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Typical Large Scale Projects

        ### Brain Project

        #### Collaboration with Alberto Astolfo, Matthias Schneider, Bruno Weber, Marco Stampanoni

        1 $cm^3$ scanned at 1 $μm$ resolution: Images ⟶ 1000 GVx / sample

        * Registration separate scans together
        * Blood vessel structure and networks
        * Registration with fMRI, histology
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging Goals

        There are three different types of problems that we will run into.

        ### Really big data sets

        * Several copies of the dataset need to be in memory for processing
        * Computers with more 256GB are expensive and difficult to find
        * Even they have 16 cores so still 16GB per CPU
        * Drive speed / network file access becomes a limiting factor
        * If it crashes you **lose** everything
            * or you have to manually write a bunch of mess check-pointing code
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging Goals

        ### Many datasets

        * For genome-scale studies 1000s of samples need to be analyzed identically
        * Dynamic experiments can have hundreds of measurements
        * Animal phenotyping can have many huge data-sets (1000s of 328GB datasets)

        ### Exploratory Studies

        <i></i>
        * Not sure what we are looking for
        * Easy to develop new analyses
        * Quick to test hypotheses
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Revised Goals

        ### The current state

        * Hundreds of image processing tools are available
        * Some tasks are easy, some are difficult
        * Much of the code is highly optimized

        ## The problems

        * GPUs are fast, but have limited memory
        * RAM is fast, but limited
        * Highly optimized code impossible to read (usually involves **black** magic)
        * Each problem is a little bit different
        * Scientific questions ≠ software packages
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Revised Goals

        * Tools that handle
            * 100x100x100 (0.001GVx) datasets in a few minutes
            * 2560x2560x2160 (14Gvx) in a few hours
            * 10,000x10,000x1000 (100+GVx) eventually
        * Simple (not much harder than Python), single (one code for all possible cluster, cloud configurations) algorithms
        * Testable code
        * Local, cluster, and cloud operation
        * Just add computers
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## What about existing tools?

        ### Positives

        <i></i>
        * Friendly GUI
        * Optimized: Use Vectorized code and GPUs
        * Scale well up to 1024 x 1024 x 1024 ≈ 1 GVx

        ### Negatives

        * if one machine crashes, everything crashes (some tools are very instable)
        * Tedious to scale to many datasets
        * Arrays cannot handle multichannel data
        * implementing new algorithms is very difficult
        * extracting specific metrics (shape as a function of distance, etc) usually not possible
        * checkpoints must be done manually
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## What about existing tools?

        ### Killers

        * You don&#39;t ask the questions you **should**, you ask the questions you **can**
        * None of these approaches are robust or deal with the data **flood**
        * 8 GB/s is more data than Facebook processes a day and 3 times as many images as Instagram (*and they are all 5Mpx 14-bit and we don&#39;t compress them*)
            * [http://news.cnet.com/8301-1023_3-57498531-93/facebook-processes-more-than-500-tb-of-data-daily/](http://news.cnet.com/8301-1023_3-57498531-93/facebook-processes-more-than-500-tb-of-data-daily/)
            * [http://techcrunch.com/2013/01/17/instagram-reports-90m-monthly-active-users-40m-photos-per-day-and-8500-likes-per-second/](http://techcrunch.com/2013/01/17/instagram-reports-90m-monthly-active-users-40m-photos-per-day-and-8500-likes-per-second/)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging as Machine Learning

        Scalable high-throughput imaging enables new realms of investigation and analysis

        * input
            * sample: genetic background, composition, etc
            * environment: treatments, temperature, mechanical testing, etc
        * output
            * structure: cell count, shape, distribution, thickness
            * function: marker/tag localization, etc
        * prediction
            * identify how a single input affects the outputs
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging as Machine Learning

        ![](ssPresentation/ss-007.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging as Machine Learning
        
        ![](ssPresentation/ss-008.png) 
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Phenotype Pipeline Example

        ![](ssPresentation/ss-009.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Solution Spark: Imaging Layer / TIPL

        Developed at [4Quant](http://www.4quant.com/), [ETH Zurich](http://www.ethz.ch/), and [Paul Scherrer Institut](http://www.psi.ch/)

        * SIL is a flexible framework for image processing and testing
            * modular design
            * verification and testing
            * reproduction of results from parameters
            * cluster integration
        * Report Generation
            * parametric assessment
            * pipelined analysis
            * Rendering subregions for movies
            * Displaying multidimensional data efficiently
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Solution Spark: Imaging Layer / TIPL

        ![](ssPresentation/ss-010.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Imaging Performance

        ![](ssPresentation/ss-011.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Imaging Performance

        ![](ssPresentation/ss-012.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Performance Extrapolated 

        ### Keeping up

        * Analyze images as fast as we measure now (1 scan / minute)
        * Analyze images as fast as we can measure (10 scans / minute)

        ### The future

        <i></i>
        * 60 scans per minute
        * 600 scans per minute (10/s)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Performance Extrapolated 

        ![](ssPresentation/ss-013.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Performance Extrapolated

        ![](ssPresentation/ss-014.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Post-processing: Statistical Analysis

        * Exploring phenotypes of 55 million cells.
        * Our current approach has been either
        * Group and divide then average the results.
            * Average Cell Volume, etc.
            * Average density or connectivity
        * Detailed analysis of individual samples
            * K-means clustering for different regions in bone / layers
            * Principal component analysis for phenotypes
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Post-processing: Statistical Analysis

        Standard problem: asking the questions you can (which are easy), rather than the questions you should

        | Phenotype | Within | Between | Ratio (%) |
        | --- | --- | --- | --- |
        | Length |  36.97 | 4.279 | 864.1 |
        | Volume |  67.85 | 12.479 | 543.7 |
        | Nearest Canal Distance | 70.35 | 333.395 | 21.1 |
        | Density (Lc.Te.V) | 144.40 | 27.658 | 522.1 |
        | Nearest Neighbors (Lc.DN) | 31.86 | 1.835 | 1736.1 |
        | Stretch (Lc.St) | 13.98 | 2.360 | 592.5 |

        The results in the table show the within and between sample variation for selected phenotypes in the first two columns and the ratio of the within and between sample numbers
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Visualizing the Variation

        How does this result look visually? Each line shows the mean ± standard deviation for sample. The range within a single sample is clearly much larger than between

        ![](ssPresentation/ss-015.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Reducing Variability

        Instead of taking the standard metrics, we can search for

        * linear combinations (principal component analysis)
        * groups (k-means)

        within the 65 million samples based on a number of different phenotypes to reduce the variation within single samples and

        * highlight the effect of genetic differences
        * instead of spatial variation.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Reducing Variability

        ![](ssPresentation/ss-016.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Numerical Performance

        With the ability to scale to millions of samples there is no need to condense. We can analyze the entire dataset in real-time and try and identify groups or trends within the whole data instead of just precalculated views of it.

        ### Practical

        1276 comma separated text files with 56 columns of data and 15-60K rows

      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Numerical Performance

        | Task | Single Core Time | Spark Time (40 cores) |
        | --- | --- | --- |
        | Load and Preprocess | 360 minutes | 10 minutes |
        | Single Column Average | 4.6s | 400ms |
        | 1 K-means Iteration | 2 minutes | 1s |

        ### Can iteratively explore and hypothesis test with data quickly

        We found several composite phenotypes which are more consistent within samples than between samples
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Real-time with Spark Streaming

        ### Before

        * Spec Macro to control acquisition
        * C program to copy data to network drive
        * Python-wrapped C program to locally create sinograms
        * Highly optimized C program called from Python script through PHP website
        * Bash scripts to copy data
        * DCL Scripts to format data properly
        * Proprietary image processing tools (with clicking)
        * Output statistics with Excel
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Real-time with Spark Streaming

        ### With Spark

        * Spec Macro to control acquisition
        * Data into a ZeroMQ pipe
        * Spark Streaming on ZeroMQ pipe

        <p class='title-image-block'>
          <img alt='' src='/slides/ssPresentation/images/ss-017.png'>
        </p>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond: Approximate Results

        Extensions of Spark out of AMPLab like BlinkDB are moving towards approximate results.

        * Instead of mean(volume)
            * `mean(volume).within_time(5)`
            * `mean(volume).within_ci(0.95)`

        For real-time image processing, with tasks like component labeling and filtering it could work well

        * are all 27 neighbor voxels needed to get a good idea of the result?
        * must every component be analyzed to get an idea about the shape distribution?
        It provides a much more robust solution than taking a small region of interest or scaling down
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond Image Processing

        For many datasets processing, segmentation, and morphological analysis is all the information needed to be extracted. For many systems like bone tissue, cellular tissues, cellular materials and many others, the structure is just the beginning and the most interesting results come from the application to physical, chemical, or biological rules inside of these structures.

        $$\sum F_i=0$$
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond Image Processing

        Such systems can be easily represented by a graph, and analyzed using GraphX in a distributed, fault tolerant manner.

        ![](ssPresentation/ss-018.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cellular Potts Simulations

        For cellular systems, a model called the Cellular Potts Model (CPM) is used to simulate growth, differentiation, coarsening, phase changes, and a number of similar properties for complex systems. Implementing such algorithms has traditionally been very tedious requiring thousands of lines of optimized MPI code (which is difficult to program well and in a stable manner).
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cellular Potts Simulations

        For real imaging data, the number of elements in these simulations can exceed 14 billion elements with 378 billion edges run over thousands of iterations

        $$E=\frac12\sum\_i{\sum_{\langle j\rangle_i}J[1 - \delta(S_i - S_j)]}$$

        *Thomas, G., de Almeida, R., & Graner, F. (2006). Coarsening of three-dimensional grains in crystals, or bubbles in dry foams, tends towards a universal, statistically scale-invariant regime. Physical Review E, 74(2), 021407. doi:10.1103/PhysRevE.74.021407*

      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cellular Potts Simulations

        ![](ssPresentation/ss-019.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cellular Potts Simulations

        ![](ssPresentation/ss-020.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Reality Check

        * Spark is **not** performant → dedicated, optimized CPU and GPU codes will perform slightly to much much better when evaulated by pixels per second per processing power unit
            * these codes will be wildly outperformed by dedicated hardware / FPGA solutions
        * Serialization overhead and network congestion are not neglible for large datasets
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Reality Check

        ### But

        * Scala / Python in Spark is substantially easier to write and test
            * Highly optimized codes are very inflexible
            * Human time is 400x more expensive than AWS time
            * Mistakes due to poor testing can be fatal
        * Spark scales smoothly to enormous datasets
            * GPUs rarely have more than a few gigabytes
            * Writing code that pages to disk is painful
        * Spark is hardware agnostic (no drivers or vendor lock-in)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Concluding 

        Spark provides a very flexible solution for large, fast image processing tasks.

        * Coarse-grained operations require rethinking (and often simplifying) common approaches to image analysis.
        * Tuples while wasteful of memory mean more flexible codes and make handling multi-channel/spectral datasets substancially easier than using arrays.
        * Bottlenecks can be written in optimized CPU / GPU code and incorparated into Spark tools using JNI (best of both worlds)
        * Spark is constantly being tweaked and optimized → your apps get faster without you doing anything
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements

        * AIT at PSI
        * TOMCAT Group

        ![](ssPresentation/ss-021.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements

        We are interested in partnerships and collaborations

        ### Learn more at

        <i></i>
        * 4Quant: From Images to Statistics - [http://www.4quant.com](http://www.4quant.com/)
        * X-Ray Imaging Group at ETH Zurich - [http://bit.ly/1gD8wKb](http://bit.ly/1gD8wKb)
        * [Quantitative Big Imaging Course at ETH Zurich](http://bit.ly/1kj9mnq)
        * These slides - [https://github.com/4Quant/spark-summit-2014-presentation](https://github.com/4Quant/spark-summit-2014-presentation)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Getting an image to Key-Value Format

        <div class="code">
          library(jpeg) <br>
          in.img<-readJPEG("ext-figures/input_image.jpg") <br>
          kv.img<-im.to.df(in.img) <br>
          write.table(kv.img,"cell_colony.csv",row.names=F,col.names=F,sep=",") <br>
          kable(head(kv.img))
        </div>

        | x | y | val |
        | --- | --- | --- |
        | 1 | 1 | 0.6275 |
        | 2 | 1 | 0.7804 |
        | 3 | 1 | 0.8863 |
        | 4 | 1 | 0.8980 |
        | 5 | 1 | 0.9098 |
        | 6 | 1 | 0.9216 |

        The key is position $\langle x,y\rangle$ and value is the intensity $val$
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Loading the data into Spark (Scala)

        <div class="code">
          val rawImage=sc.textFile("cell\_colony.csv") <br>
          val imgAsColumns=rawImage.map(\_.split(",")) <br>
          val imgAsKV=imgAsColumns.map(point => ((point(0).toInt,point(1).toInt),point(2).toDouble))
        </div>

        * Count the number of pixels

        <pre>
          <code>
          imgAsKV.count
                  </code>
          </pre>

        * Get the first value

        <pre>
          <code>
          imgAsKV.take(1)
                  </code>
          </pre>

        * Sample 100 values from the data

        <pre>
          <code>
          imgAsKV.sample(true,0.1,0).collect
                  </code>
          </pre>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Perform a threshold

        <div class="code">
          val threshVal=0.5 <br>
          val labelImg=imgAsKV.filter(\_.\_2&#60;threshVal)
        </div>


        * Runs on 1 core on your laptop or 1000 cores in the cloud or on a local cluster resource.
        * If one computer crashes or disconnects it **automatically** continues on another one.
        * If one part of the computation is taking too long it will be sent to other computers to finish
        * If a computer runs out of memory it writes the remaining results to disk and continues running (graceful dropoff in performance )

        ### Get Volume Fraction

        <pre>
          <code>
          100.0*labelImg.count/(imgAsKV.count)
                  </code>
          </pre>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Region of Interest

        Take a region of interest between 0 and 100 in X and Y

        <div class="code">
        def roiFun(pvec: ((Int,Int),Double)) =  <br>
           {pvec._1._1>=0 & pvec._1._1<100 & // X <br>
            pvec._1._2>=0 & pvec._1._2<100 } //Y <br>
          val roiImg=imgAsKV.filter(roiFun)
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Perform a 3x3 box filter

        <div class="code">
          def spread\_voxels(pvec: ((Int,Int),Double), windSize: Int = 1) = { <br>
            val wind=(-windSize to windSize) <br>
            val pos=pvec.\_1 <br>
            val scalevalue=pvec.\_2/(wind.length*wind.length) <br>
            for(x<-wind; y<-wind)  <br>
              yield ((pos.\_1+x,pos.\_2+y),scalevalue) <br>
          } <br>
          <br>
          val filtImg=roiImg. <br>
                flatMap(cvec => spread\_voxels(cvec)). <br>
                filter(roiFun).reduceByKey(\_ + \_)
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Setting up Component Labeling

        * Create the first labels from a thresheld image as a mutable type

        <pre>
          <code>
          val xWidth=100 <br>
          var newLabels=labelImg.map(pvec => (pvec.\_1,(pvec.\_1.\_1.toLong*xWidth+pvec.\_1.\_2+1,true)))
                  </code>
          </pre>

        * Spreading to Neighbor Function

        <div class="code">
          def spread\_voxels(pvec: ((Int,Int),(Long,Boolean)), windSize: Int = 1) = { <br>
            val wind=(-windSize to windSize) <br>
            val pos=pvec.\_1 <br>
            val label=pvec.\_2.\_1 <br>
            for(x<-wind; y<-wind)  <br>
              yield ((pos.\_1+x,pos.\_2+y),(label,(x==0 & y==0))) <br>
          }
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Running Component Labeling

        <div class="code">
        var groupList=Array((0L,0)) <br>
          var running=true <br>
          var iterations=0 <br>
          while (running) { <br>
            newLabels=newLabels. <br>
            flatMap(spread\_voxels(\_,1)). <br>
              reduceByKey((a,b) => ((math.min(a.\_1,b.\_1),a.\_2 | b.\_2))). <br>
              filter(\_.\_2.\_2) <br>
            // make a list of each label and how many voxels are in it <br>
            val curGroupList=newLabels.map(pvec => (pvec.\_2.\_1,1)). <br>
              reduceByKey(\_ + \_).sortByKey(true).collect <br>
            // if the list isn't the same as before, continue running since we need to wait for swaps to stop <br>
            running = (curGroupList.deep!=groupList.deep) <br>
            groupList=curGroupList <br>
            iterations+=1 <br>
            print("Iter #"+iterations+":"+groupList.mkString(","))
          } <br>
          groupList
        </div>

      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Calculating From Images

        <i></i>
        * Average Voxel Count

        <pre>
          <code>
          val labelSize = newLabels. <br>
            map(pvec => (pvec.\_2.\_1,1)). <br>
            reduceByKey((a,b) => (a+b)). <br>
            map(\_.\_2) <br>
          labelSize.reduce((a,b) => (a+b))*1.0/labelSize.count
                  </code>
          </pre>

        * Center of Volume for Each Label

        <div class="code">
          val labelPositions = newLabels. <br>
            map(pvec => (pvec.\_2.\_1,pvec.\_1)). <br>
            groupBy(\_.\_1) <br>
          def posAvg(pvec: Seq[(Long,(Int,Int))]): (Double,Double) = { <br>
          val sumPt=pvec.map(\_.\_2).reduce((a,b) => (a.\_1+b.\_1,a.\_2+b.\_2)) <br>
          (sumPt.\_1\*1.0/pvec.length,sumPt.\_2*1.0/pvec.length) <br>
          } <br>
          print(labelPositions.map(pvec=>posAvg(pvec.\_2)).mkString(","))
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Lazy evaluation

        * No execution starts until you save the file or require output
        * Spark automatically deconstructs the pipeline and optimizes the jobs to run so computation is not wasted outside of the region of interest (even though we did it last)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Running Spark in a Sun Grid Engine (or similar)

        Ideally Spark is used on a dedicated cluster or using Mesos tools, but many existing clusters are running Sun Grid Engine or similar frameworks and unlikely to change in the near future (legacy codes). Spark can, however, be run very efficiently run inside these environments (more [here](https://github.com/4Quant/sge_spark))

        1. Start the master node on one of the machines (locally)
            * `start-master.sh`
        2. Submit the code to run to the queue management system
            * `qsub mysparkjob.sge -master=spark://masternode.me:7077` <br> *(replace masta.me accordingly)*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Running Spark in a Sun Grid Engine (or similar)

        Submit many worker jobs connecting to the `master node for i in {1..100}; do qsub sparkworker.sge spark://masternode.me:7077; done`

        ### Note

        As worker jobs are scheduled by Sun Grid Engine they connect to the master and work on whatever needs to be done. **Workers will not quit until they exceed the maximum running time** (`s_rt`)
      </script>
    </section>

  </div>
</div>
