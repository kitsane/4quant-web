<div class='reveal'>
  <div class='slides'>

    <section data-markdown>
      <script type='text/template'>
        # High-throughput, Scalable, Quantitative, Cellular Phenotyping using X-Ray Tomographic Microscopy

        Kevin Mader [1,2,3], Leah Rae Donahue [4], Ralph Müller [5], and Marco Stampanoni [1,2] <br>
        8 April 2014

        <i></i>
        1. Swiss Light Source, Paul Scherrer Institut, 5232 Villigen, Switzerland
        1. Institute for Biomedical Engineering, University and ETH Zurich, 8092 Zurich, Switzerland
        1. 4Quant, Zurich, Switzerland
        1. The Jackson Laboratory, Bar Harbor, ME, United States
        1. Institute for Biomechanics, ETH Zurich, 8093 Zurich, Switzerland

        <p class='title-image-block'>
          <img alt='Paul Scherrer Institute' class='inline-image' src='/slides/iwbbioPresentation/images/iwbbio-001.png'>
          <img alt='ETH Zurich' class='inline-image' src='/slides/iwbbioPresentation/images/iwbbio-002.png'>
          <img alt='4Quant' class='inline-image' src='/slides/iwbbioPresentation/images/iwbbio-003.png'>
        </p>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        # Outline

        * Introduction
        * Motivation
            * Big Data
            * Scalability
        * Scalability
            * Imaging
            * Numerical Analysis
        * Results
        * Performance
        * Beyond
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Introduction

        * A phenotype is a very general term for any measurable characteristic resulting from a combination of genetic background and environmental conditions
            * All fields of genetics are ultimately dependant on phenotypes since they are the observable differences
        * Structural phenotypes are related to position, size, shape, and organization of different cells, tissues, and organs
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Introduction

        ![](iwbbioPresentation/iwbbio-004.png)

        ### Implied

        * Many points, involves looking at 100s to 10000s+ of samples
        * Reproducible, every sample needs to be handled identically to avoid biasing the results
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        The only technique which can do **all**

        * peer *deep* into large samples
        * achieve $<1\mu m$ isotropic spatial resolution
            * with **1.8mm** field of view
        * achieve **>10 Hz** temporal resolution

        ![](iwbbioPresentation/iwbbio-005.png)

        *[1] Mokso et al., J. Phys. D, 46(49),2013*
      </script>
    </section>

    <!-- TODO: missed video  https://rawgit.com/4Quant/IWBBIO2014/master/iwbbioPresentation.html#/3 -->
    <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        ### Cellular and Canal Structures in Murine Cortical Bone

        **So we have the imaging modality, now what?**
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Phenotyping

        ![](iwbbioPresentation/iwbbio-006.png)
      </script>
    </section>

    <!-- TODO: missed video  https://rawgit.com/4Quant/IWBBIO2014/master/iwbbioPresentation.html#/2 -->
    <section data-markdown>
      <script type='text/template'>
        ## Scaling Acquisition

        ### Automated Sample Exchange

        ### Automated Alignment and Region of Interest Scanning
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acquisition Results

        1300 bone samples measured at $0.7 μ$ m resolution in 2 weeks, **automatically**

        ![](iwbbioPresentation/iwbbio-007.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Time Consumption

        Just like genetics, the burden of imaging is moving from acquisition to post-processing

        ![](iwbbioPresentation/iwbbio-008.png)

        *[3] Sboner A,et. al. Genome Biology, 2011*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Post-Processing Motivation

        There are three different types of problems that we will run into.

        ### Really big data sets
        <i></i>
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
        ## Post-Processing Motivation

        ### Many datasets

        <i></i>
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
        ## Definition: Big Data

        ### Velocity, Volume, Variety

        When a ton of heterogeneous is coming in fast.

        **Performant, scalable, and flexible**

        ### When scaling isn&#39;t scary

        10X, 100X, 1000X is the same amount of effort

        ### When you are starving for enough data

        Most imaging groups are overwhelmed with data (8GB/s adds up very quickly)

        ### O 'clicks' per sample
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Don&#39;t existing tools already do Big Data

        * **Not really.**
        * Scale well up to 1024 x 1024 x 1024 ≈ 1 GVx.
        * take 12-24 hours for full structural analysis
        * if one machine crashes, everything crashes
        * High performance GPU methods are very tedious to scale to large datasets
        * Some tools for **filtering** →, other tools for **segmentation** →, others for **visualization** → others for **statistical analysis**
            * Spend a lot of time writing *glue*
            * Different languages, conventions, and tools
        * None of these approaches are robust or deal with the data **flood**
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why is scaling up hard?

        ### Parallel

        #### Coordination

        Parallel computing requires a significant of coordinating between computers for non-easily parallelizable tasks.

        #### Mutability

        If you have two cores / computers trying to write the same information at the same it is no longer deterministic (not good)

        #### Blocking

        Taking turns and waiting for every independent process to run completely negates the benefits of parallel computing
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why is scaling up hard?

        ### Distributed

        Sending Instructions / Data Afar

        #### Fault Tolerance

        If you have 1000 computers working on solving a problem and one fails, you do not want your whole job to crash

        #### Data Storage

        How can you access and process data from many different computers quickly without very expensive infrastructure
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why is it even harder?

        Each parallel library / tool requires different tools with different constraints CUDA, OpenCL, OpenMPI, Matlab Distributed Toolbox, KORUS, .NET Concurrent Framework, Python Multiprocessing, Hadoop, Storm, Impala, Redshift

        * Learn many very specific code bases, and **managing** the logistics of organizing.
        * Almost none are fault-tolerant out of the box.
        * *Lock in:* Transitioning from one code-base to another is at best nightmarish
        * Testing and profiling code locally can be very difficult
        * None of them are flexible allowing extra-processing power to “jump” in intense complications when it is needed
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Solution: Spark / Resilient Distributed Datasets

        ### Technical Specifications

        * Developed by the [AMP](https://amplab.cs.berkeley.edu/) Lab at UC Berkeley in 2012
        * General tool for all Directed Acyclical Graph (DAG) workflows
        * Course-grained processing → simple operations applied to entire sets
            * Map, reduce, join, group by, fold, foreach, filter,…
        * In-memory caching
        * Based on Scala, offers interactive REPL

        ![](iwbbioPresentation/iwbbio-009.png)

        *Zaharia, M., et. al (2012). Resilient distributed datasets: a fault-tolerant abstraction for in-memory cluster computing*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Solution: Spark / Resilient Distributed Datasets

        ### Practical Specification

        * Distributed, parallel computing without **logistics**, libraries, or compiling
        * Declarative rather than imperative
            * Apply operation $f$ to each image / block
            * Even scheduling is handled automatically
        * Input and results can be stored in memory, on disk, in the cloud, using Hadoop, redundantly or not
        * Functional, unit, integration tests can be performed locally
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark: Imaging Layer / TIPL

        Developed at [ETH Zurich](http://www.ethz.ch/), [Paul Scherrer Institut](http://www.psi.ch/) and [4Quant](http://www.4quant.com/)

        * TIPL is a flexible framework for image processing and analysis
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
        ## Spark: Imaging Layer / TIPL

        ![](iwbbioPresentation/iwbbio-010.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Image Processing Results

        1300 bone samples analyzed using the Merlin Cluster at PSI in 6 weeks

        * Segmentation
            * hard calcified tissue (bone)
            * interior soft tissue (canals and cells)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Image Processing Results

        * Shape Analysis on all cells
        * Distance Maps for Colocation Analysis
        * Voronoi Tesselation for Density and Neighborhood Metrics

        ![](iwbbioPresentation/iwbbio-011.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Image Processing Results

        ![](iwbbioPresentation/iwbbio-012.png)
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

        If we do that, we miss a lot!

        | Phenotype | Within | Between | Ratio (%) |
        | --- | --- | --- | --- |
        | Length |  36.97 | 4.279 | 864.1 |
        | Width | 27.92 | 4.734 | 589.9 |
        | Height |  25.15 | 4.636 | 542.5 |
        | Volume |  67.85 | 12.479 | 543.7 |
        | Nearest Canal Distance | 70.35 | 333.395 | 21.1 |
        | Density (Lc.Te.V) | 144.40 | 27.658 | 522.1 |
        | Nearest Neighbors (Lc.DN) | 31.86 | 1.835 | 1736.1 |
        | Stretch (Lc.St) | 13.98 | 2.360 | 592.5 |
        | Oblateness (Lc.Ob) | 141.27 | 18.465 | 765.1 |

        The results in the table show the within and between sample variation for selected phenotypes in the first two columns and the ratio of the within and between sample numbers
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Visualizing the Variation

        How does this result look visually? Each line shows the mean ± standard deviation for sample. The range within a single sample is clearly much larger than between

        ![](iwbbioPresentation/iwbbio-013.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## New Phenotypes

        Phenotype values at D9Mit259 Marker located on chromosome 9 in the mouse

        ![](iwbbioPresentation/iwbbio-014.png)
      </script>

    <!-- TODO: 404 error here ! https://rawgit.com/4Quant/IWBBIO2014/master/iwbbioPresentation.html#/19 -->
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Imaging Performance

        ![](iwbbioPresentation/iwbbio-015.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Imaging Performance

        ![](iwbbioPresentation/iwbbio-016.png)
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
        ## Rich, heavily developed platform

        ### Available Tools

        Tools built for table-like data data structures and much better adapted to it.

        * [K-Means](https://github.com/apache/incubator-spark/blob/master/examples/src/main/scala/org/apache/spark/examples/SparkKMeans.scala), [Correlation](https://github.com/freeman-lab/thunder/blob/master/python/thunder/sigprocessing/localcorr.py), [PCA](https://github.com/freeman-lab/thunder/blob/master/python/thunder/factorization/pca.py)
        * [Matrix Factorization](https://amplab.cs.berkeley.edu/projects/dfc-%C2%A0divide-and-conquer-matrix-factorization/), [Genomics](https://amplab.cs.berkeley.edu/projects/dna-processing-pipeline/), [Graph Analytics](https://amplab.cs.berkeley.edu/projects/graphx/), [Machine Learning](https://amplab.cs.berkeley.edu/projects/mlbase/)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Rich, heavily developed platform

        ### Commercial Support

        Dozens of major companies (Apple, Google, Facebook, Cisco, …) donate over $30M a year to development of Spark and the Berkeley Data Analytics Stack

        * 2 startups in the last 6 months with seed-funding in excess of $15M each

        ### Academic Support

        * All source code is available on GitHub
            * Elegant (20,000 lines vs my PhD of 75,000+)
        * No patents or restrictions on usage
        * Machine Learning Course in D-INFK next semester based on Spark
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quo Vadis: Synchrotron-based µCT Imaging?

        ### Needs

        * Scale up to 1000GVx samples (eventually)
        * Analyze standard measurements 14GVx regularly in a day
        * Analyze as fast as we usually measure 15 minutes / scan

        ### Would be nice

        * Analyze scans as fast as we measure now (1 scan / minute)
        * Analyze scans as fast as we could measure with Gigafrost (10 scans / minute)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quo Vadis: Synchrotron-based µCT Imaging?

        ![](iwbbioPresentation/iwbbio-017.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quo Vadis: Synchrotron-based µCT Imaging?

        ![](iwbbioPresentation/iwbbio-018.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond: Streaming

        ### Post-processing goals

        <i></i>
        * Analysis done in weeks instead of months
        * Some real-time analysis and statistics

        ### Streaming

        Can handle static data or live data coming in from a 'streaming' device like a camera to do real-time analysis. The exact same code can be used for real-time analysis and static code

        ### Scalability

        Connect more computers.

        Start workers on these computer (*Full Stop*).
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond: Streaming

        Source could the camera server itself or a watched directory on a machine.

        ![](iwbbioPresentation/iwbbio-019.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond: Approximate Results

        Projects at AMPLab like Spark and BlinkDB are moving towards approximate results.

        * Instead of mean(volume)
            * `mean(volume).within_time(5)`
            * `mean(volume).within_ci(0.95)`

        For real-time image processing it might be the only feasible solution and could drastically reduce the amount of time spent on analysis.
      </script>
    </section>
    <!-- TODO: missed video here https://rawgit.com/4Quant/IWBBIO2014/master/iwbbioPresentation.html#/26 -->
    <section data-markdown>
      <script type='text/template'>
        ## What sort of projects demand this?

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
        ## What sort of projects demand this?

        ### Brain Project

        #### Collaboration with Alberto Astolfo, Matthias Schneider, Bruno Weber, Marco Stampanoni

        1 $cm^3$ scanned at 1 $μm$ resolution: Images ⟶ 1000 GVx / sample

        * Registration separate scans together
        * Blood vessel structure and networks
        * Registration with fMRI, histology
      </script>
    </section>

    <!-- TODO: 404 here https://rawgit.com/4Quant/IWBBIO2014/master/iwbbioPresentation.html#/27 -->

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        * AIT at PSI
        * X-Ray Microscopy Group at the TOMCAT Beamline of the Swiss Light Source

        ![](iwbbioPresentation/iwbbio-020.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        We are interested in partnerships and collaborations

        ### Learn more at

        <i></i>
        * This Presentation - [https://github.com/4Quant/IWBBIO2014](https://github.com/4Quant/IWBBIO2014)
        * 4Quant: From Images to Statistics - [http://www.4quant.com](http://www.4quant.com/)
        * X-Ray Imaging Group at ETH Zurich - [http://bit.ly/1gD8wKb](http://bit.ly/1gD8wKb)
        * Quantitative Big Imaging Course at ETH Zurich - [http://bit.ly/1kj9mnq](http://bit.ly/1kj9mnq)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Starting Spark

        [Spin up your own cluster in an hour](https://amplab.cs.berkeley.edu/2013/10/23/got-a-minute-spin-up-a-spark-cluster-on-your-laptop-with-docker/)

        1. Start a master node `start-master.sh`
        1. Start several worker nodes

        `start-worker.sh spark://master-ip:7077 -c #CORES -m #MEM`

        1. Start the Spark-Shell `spark-shell.sh`
        1. Write code in Scala, Java, Python, or R
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Perform a threshold

        <pre>
          <code>
          val threshVal=127 <br>
          val labelImg=inImg.filter(_._2>threshVal)
                  </code>
          </pre>

        * Runs on 1 core on your laptop or 1000 cores in the cloud or on Merlin or the beamline.
        * If one computer crashes or disconnects it **automatically** continues on another one.
        * If one part of the computation is taking too long it will be sent to other computers to finish
        * If a computer runs out of memory it writes the remaining results to disk and continues running (graceful dropoff in performance )
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Region of Interest

        Take a region of interest between 0 and 100 in X,Y, and Z

        <div class="code">
          def roiFunc(pvec: ((Int,Int,Int),Double)) = <br>
           {pvec._1._1>=0 & pvec._1._1<100 & // X <br>
            pvec._1._2>=0 & pvec._1._2<100 & //Y <br>
            pvec._1._3>=0 & pvec._1._3<100} // Z <br>
          <br>
          rImg.filter(roiFunc)
        </div>
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## Perform a 3x3x3 box filter

        <div class="code">
          def spread\_voxels(pvec: ((Int,Int,Int),Double), windSize: Int = 1) = { <br>
            val wind=(-windSize to windSize) <br>
            val pos=pvec.\_1 <br>
            val scalevalue=pvec.\_2/(wind.length**3) <br>
            for(x<-wind; y<-wind; z<-wind)  <br>
              yield ((pos.\_1+x,pos.\_2+y,pos.\_3+z),scalevalue) <br>
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
        ## Perform component labeling

        <div class="code big-code">
          var groupList=Array((0L,0)) <br>
          var running=true <br>
          var iterations=0 <br>
          while (running) { <br>
            val newLabels=labelImg. <br>
            flatMap(spread\_voxels(\_,1)). <br>
              reduceByKey((a,b) => (math.min(a.\_1,b.\_1),(a.\_2 | b.\_2))). <br>
              filter(\_.\_2.\_2). // keep only voxels which contain original pixels <br>
              map(pvec => (pvec.\_1,pvec.\_2.\_1)) <br>
            // make a list of each label and how many voxels are in it <br>
            val curGroupList=newLabels.map(pvec => (pvec.\_2,1)). <br>
              reduceByKey(\_ + \_).sortByKey(true).collect <br>
            // if the list isn't the same as before, continue running since we need to wait for swaps to stop <br>
            running = (curGroupList.deep!=groupList.deep) <br>
            groupList=curGroupList <br>
            labelImg=newLabels <br>
            iterations+=1 <br>
            print("Iter #"+iterations+":"+groupList.mkString(",")) <br>
          } <br>
          groupList
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Lazy evaluation

        <div class='code'>
          val outThresh=inImg.map(threshFunc) <br>
          val outLabels=runCL(outThresh) <br>
          outLabels.filter(roiFunc).saveImage('test.tif')
        </div>

        * No execution starts until you save the file or require output
        * Spark automatically deconstructs the pipeline and optimizes the jobs to run so computation is not wasted outside of the region of interest (even though we did it last)
      </script>
    </section>

  </div>
</div>
