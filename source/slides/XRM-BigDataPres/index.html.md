<div class='reveal'>
  <div class='slides'>

    <section data-markdown>
      <script type='text/template'>
        # High-throughput, Scalable, Quantitative, Cellular Phenotyping using X-Ray Tomographic Microscopy

        Kevin Mader <br>
        October 2014, XRM Big Data Satellite Workshop

        ![](/slides/XRM-BigDataPres/images/xrm-001.png)
        ![](/slides/XRM-BigDataPres/images/xrm-002.png)
        ![](/slides/XRM-BigDataPres/images/xrm-003.png)
        ![](/slides/XRM-BigDataPres/images/xrm-004.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline
        
        * Background: X-Ray Tomographic Microscopy
        * Microscopy in 2014
        * The Problem
        * Scaling 3D Imaging
        * Scaling Hyperspectral Imaging
        * Towards Real-time Imaging
        * Beyond
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        ### Goal
        To develop an image analysis infrastructure to make complex problems simple.

        * handle the flood of data from current and next generation instruments
        * avoid mistakes through thorough, quantitative unit-testing

        ![](/slides/XRM-BigDataPres/images/xrm-005.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        The only technique which can do **all**

        * peer **deep** into large samples
        * achieve $<1\mu m$ isotropic spatial resolution
            * with **1.8mm** field of view
        * achieve >10 Hz temporal resolution
        * **8GB/s** of images

        ![](/slides/XRM-BigDataPres/images/xrm-006.png)

        *[1] Mokso et al., J. Phys. D, 46(49),2013*
      </script>
    </section>
    
    <!-- TODO: missed video https://rawgit.com/4Quant/xrm-big-data/master/xrmBigDataPres.html#/2 -->
    <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        <video controls='controls' data-autoplay>
          <source src='../video/volcano.m4v' type='video/mp4'>
          Your browser does not support the video tag.
        </video>

        *Courtesy of M. Pistone at U. Bristol*
      </script>
    </section>

    <!-- TODO: 2 missed video https://rawgit.com/4Quant/xrm-big-data/master/xrmBigDataPres.html#/3 -->
    <!-- <section data-markdown>
      <script type='text/template'>
        ## How tomography works

      </script>
    </section> -->
    
    <!-- TODO: missed video https://rawgit.com/4Quant/xrm-big-data/master/xrmBigDataPres.html#/4 -->
    <!-- <section data-markdown>
      <script type='text/template'>
        ## Reconstructing 3D Structures

        Filtered back-projection / Radon transform
      </script>
    </section> -->

    <section data-markdown>
      <script type='text/template'>
        ## Reconstructing 3D Structures

        ### Segmentation and Post-processing

        <video controls='controls' data-autoplay>
          <source src='../video/RotBoneHole.m4v' type='video/mp4'>
          Your browser does not support the video tag.
        </video>
      </script>
    </section>

    <!-- TODO: missed video https://rawgit.com/4Quant/xrm-big-data/master/xrmBigDataPres.html#/5 -->
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
        ## Microscopy in 2014

        Ever more sensitive and faster hardware means image acquisition possibilities are growing rapidly

        ### X-Ray

        * SRXTM images at (>1000fps) → 8GB/s
        * cSAXS thousands of high-resolution diffraction patterns in minutes, acquisition rates might soon reach 30GB/s
        * Nanoscopium, 10TB/day, 10-500GB file sizes, multiple pieces of information acquired in parallel

        ### Optical

        * Light-sheet microscopy (see talk of Jeremy Freeman) produces images → 500MB/s
        * High-speed confocal images at (>200fps) → 78Mb/s
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Microscopy in 2014

        Images are only as useful as what you can do with them, the bottleneck isn&#39;t measurement speed, but analysis

        ![](/slides/XRM-BigDataPres/images/xrm-007.png)

        *Adapted from: Sboner A,et. al. Genome Biology, 2011*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Data

        A single absorption image can easily be represented as an array. Hundreds of **existing** tools will process this array and filter, segment, and quantify structures.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Data

        * What about a large 3D image that won&#39;t fit in memory?
            * Many tiny arrays, and then exchange information when needed? **Painful to code**
            * Write everything to the disk? **Slow to run**
        * What if it is sparse?
            * Do nothing? **Waste time analyzing nothing**
            * Use sparse structures? **Existing tools don&#39;t work**
        * What if there is more information (phase, dark-field)?
            * Store it in a 3D array? **Existing tools don&#39;t work**
            * Store it in 3 seperate arrays? **No connection between points**
            * Store it as a list? **Cannot use existing tools**
            * Store it as a list of arrays? **Too much information, no connection between points**
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The Problem

        ### There is a flood of new data

        What took an entire PhD 3-4 years ago, can now be measured in a weekend, or even several seconds. Analysis tools have not kept up, are difficult to customize, and usually highly specific.

        ### Optimized Data-Structures do not fit

        Data-structures that were fast and efficient for computers with 640kb of memory do not make sense anymore

        ### Single-core computing is too slow

        CPU&#39;s are not getting that much faster but there are a lot more of them. Iterating through a huge array takes almost as long on 2014 hardware as 2006 hardware
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The reality

        ### X-Ray Microscopy isn&#39;t the first

        Google, Facebook, Yahoo, and Amazon had these, or very similar problems years ago. They hired a lot of very competent Computer Science PhDs to solve it.

        ### Cloud computing is ubiquitious and cheap

        Cloud computing infrastructures are 10-100X cheaper than labor costs, usually more reliable internal systems, and easily accessible from **almost** anywhere.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The reality

        ### The big why!

        * You don&#39;t ask the questions you **should**, you ask the questions you **can**
        * None of these approaches are robust or deal with the data **flood**
        * 8 GB/s is more data than Facebook processes a day and 3 times as many images as Instagram (*and they are all 5Mpx 14-bit and we don&#39;t compress them*)
            * [http://news.cnet.com/8301-1023_3-57498531-93/facebook-processes-more-than-500-tb-of-data-daily/](http://news.cnet.com/8301-1023_3-57498531-93/facebook-processes-more-than-500-tb-of-data-daily/)
            * [http://techcrunch.com/2013/01/17/instagram-reports-90m-monthly-active-users-40m-photos-per-day-and-8500-likes-per-second/](http://techcrunch.com/2013/01/17/instagram-reports-90m-monthly-active-users-40m-photos-per-day-and-8500-likes-per-second/)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## What we want?

        ### Fast, scalable computing

        Run it on your laptop, local cluster, or 5000 machines at Amazon without rewriting anything

        * No management of dead-locks, mutability, and blocking
        * Test exact same code as you run on the cluster
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## What we want?
          
        ### Reliable

        * One machine crashes, the next picks up where it left off
        * Run of out memory, just write to disk

        ### Easy

        **Readable**, small code bases which focus on analysis rather than data management details

        * No dealing with thread management, message passing, memory allocation
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Big Data: Definition

        ### Velocity, Volume, Variety

        When a ton of heterogeneous is coming in fast.

        **Performant, scalable, and flexible**

        ### When scaling isn&#39;t scary

        10X, 100X, 1000X is the same amount of effort

        ### When you are starving for enough data

        Co-director of UC-Berkeley&#39;s AMPLab, Michael Franklin, said their rate limiting factor is **always** enough interesting data

        ### O 'clicks' per sample
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Big Data: A brief introduction

        Google ran head-first into *Big Data* trying to create an index of the internet. Single computers cannot do everything and writing parallel and distributed code is complicated, **difficult to test**, easy to break, and often **non-deterministic**. The resulting code is a tangled inseperable mess of computation, data, and processing management.

        ### MapReduce

        A robust, fault-tolerant framework for handling distributed processing and data storage on which complicated analyses could be run **declaritively** by specifying **what** not **how**. Reduced data processing vocabulary to two words *Map* and *Reduce*. Recreated and open-sourced by Yahoo as Hadoop.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Big Data: A brief introduction
        
        ### Apache Spark

        MapReduce can be applied to many tasks, but it is often very tricky and time-consuming to describe complicated, interative workflows into just map and reduce. Spark expanded the vocabulary of Hadoop to *filter, flatMap, aggregate, join, groupBy*, and *fold*, incorporated many performance improvements through caching (very important for images) and interactive (REPL) shell

        * **World Record** Holder for Terabyte and Petabyte Sort
            * 100TB of data on 206 machines in 23 minutes
            * 1PB of data in 190 machines in <4 hours
        * Sustained data rates of 3Gb/s/node (map) and 1.1Gb/s/node (reduce)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The Framework First

        * Rather than building an analysis as quickly as possible and then trying to hack it to scale up to large datasets
            * chose the framework **first**
            * then start making the necessary tools.
        * Google, Amazon, Yahoo, and many other companies have made huge in-roads into these problems
        * The real need is a fast, flexible framework for robustly, scalably performing complicated analyses, a sort of Excel for big imaging data.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The Framework First

        ### Apache Spark and Hadoop 2

        The two frameworks provide a free out of the box solution for

        * scaling to &#62;10000 computers
        * storing and processing exabytes of data
        * fault tolerance
            * 2/3rds of computers can crash and a request still accurately finishes
        * hardware and software platform indpendence (Mac, Windows, Linux)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hadoop Filesystem (HDFS not HDF5)

        Bottleneck is filesystem connection, many nodes (10+) reading in parallel brings even GPFS-based fiber system to a crawl

        ![](/slides/XRM-BigDataPres/images/xrm-008.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hadoop Filesystem (HDFS not HDF5)

        One of the central tenants of MapReduce™ is data-centric computation → instead of data to computation, move the computation to the data.

        * Use fast local storage for storing everything redundantly → less transfer and fault-tolerance
        * Largest file size: 512 yottabytes, Yahoo has 14 petabyte filesystem in use

        ![](/slides/XRM-BigDataPres/images/xrm-009.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark &#8211;&#62; Microscopy?

        These frameworks are really cool and Spark has a big vocabulary, **but** *flatMap, filter, aggregate, join, groupBy*, and *fold* still do not sound like anything I want to do to an image.

        I want to

        * filter out noise, segment, choose regions of interest
        * contour, component label
        * measure, count, and analyze
        * …
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark &#8211;&#62; Microscopy?

        **Spark Image Layer**

        * Developed at [4Quant](http://www.4quant.com/), [ETH Zurich](http://www.ethz.ch/), and [Paul Scherrer Institut](http://www.psi.ch/)
        * The Spark Image Layer is a *Domain Specific Language* for Microscopy for Spark.
        * It converts common imaging tasks into coarse-grained Spark operations
        * Spark handles processing, fault-tolerance, and resource management

        ![](/slides/XRM-BigDataPres/images/xrm-010.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Image Layer

        We have developed a number of commands for SIL handling standard image processing tasks

        ![](/slides/XRM-BigDataPres/images/xrm-011.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        <span>
          New components can be added using
          <img alt='4Quant' class='inline-image' src='/slides/XRM-BigDataPres/images/xrm-013.png'>
          or imported from ImageJ directly. The resulting analyses are then <em>parallelized</em> by the Spark Engine and run on multiple cores/CPUs locally, on a cluster, supercomputer, or even a virtual in the cluster in the cloud which can be started in seconds.
        </span>

        ![](/slides/XRM-BigDataPres/images/xrm-012.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How does scaling look?

        ![](/slides/XRM-BigDataPres/images/xrm-014.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How does scaling look?

        ![](/slides/XRM-BigDataPres/images/xrm-015.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Fault-Tolerance

        ![](/slides/XRM-BigDataPres/images/xrm-016.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Fault-Tolerance

        Fault-tolerance is particularly tedious to add into existing tools, it must be done from the first step. Spark Imaging Layer is fault-toleranct and allows checkpointing with single `result.checkpoint()` commands enabling long running analyses to continue
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Flexibility through Types

        Developing in Scala brings additional flexibility through types[1], with microscopy the standard formats are 2-, 3- and even 4- or more dimensional arrays or matrices which can be iterated through quickly using CPU and GPU code. While still possible in Scala, there is a great deal more flexibility for data types allowing anything to be stored as an image and then processed as long as basic functions make sense.

        [1] Fighting Bit Rot with Types (Experience Report: Scala Collections), M Odersky, FSTTCS 2009, December 2009
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Flexibility through Types

        A collection of positions and values, maybe more (not an array of double). Arrays are efficient for storing in computer memory, but often a poor way of expressing scientific ideas and analyses.

        * Filter Noise?

        *combine information from nearby pixels*

        * Find objects

        *determine groups of pixels which are very similar to desired resul*
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## Practical Meaning

        Much simplier code and combining different pieces of information is trivial. For example calculating the distance to the nearest vessel and then determining the average distance of each cell

        <div class="code">
          cellDist = vesselImage.invert. <br>
            calculateDistance <br>
          cellLabel = cellThreshold.makeLabel <br>
          avgCellDist = cellLabel.join(cellDist). <br>
            groupBy(LABEL).reduce(MEAN)
        </div>

        This analysis can be done easily since the types are flexible

        ![](/slides/XRM-BigDataPres/images/xrm-017.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Practical Meaning

        ![](/slides/XRM-BigDataPres/images/xrm-018.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hyperspectral Imaging

        Hyperspectral imaging is a rapidly growing area with the potentially for massive datasets and a severe deficit of usuable tools.  

        ![](/slides/XRM-BigDataPres/images/xrm-019.png)   
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hyperspectral Imaging        
        
        The scale of the data is large and standard image processing tools are ill-suited for handling them, although the ideas used in image processing are equally applicable to hyperspectral data (filtering, thresholding, segmentation,…) and distributed, parallel approaches make even more sense on such massive datasets

      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hyperspectral Imaging        
        
        ![](/slides/XRM-BigDataPres/images/xrm-020.png) 
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## With SIL
        
        Using SIL, Hyperspectral images are treated the same way as normal images and all of the operations you apply an a normal image are applicable, as long as the underyling operations are defined. A Gaussian filter might seem like a strange operation at first, but using information from each of a points neighbors to reduce noise makes sense.

        * A Gaussian filter
            * Consists of addition, multiplication, and division
            * Define: operations as channel-wise
        * K-Means Clustering
            * Similar points are grouped together
            * Define: a distance metric between two spectra
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## With SIL

        Identify cells from background by K-Means (2 groups) and then count the cells

        <div class="code">
          clusters = KMeans.train(specImage,2) <br>
          labeledCells = specImage.map(clusters.identify(_)). <br>
            makeLabels <br>
          print labeledCells.distinct.count+" cells"
        </div>
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

        ![](/slides/XRM-BigDataPres/images/xrm-021.png) 
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Imaging as Machine Learning
        
        ![](/slides/XRM-BigDataPres/images/xrm-022.png) 
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
        ### With Spark

        * Spec Macro to control acquisition
        * Data into a ZeroMQ pipe
        * Spark Streaming on ZeroMQ pipe

        ![](/slides/XRM-BigDataPres/images/xrm-023.png) 
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond Image Processing

        For many datasets processing, segmentation, and morphological analysis is all the information needed to be extracted. For many systems like bone tissue, cellular tissues, cellular materials and many others, the structure is just the beginning and the most interesting results come from the application to physical, chemical, or biological rules inside of these structures.

        $$\sum_j \vec {F_i}_j =m\ddot x_i$$
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Beyond Image Processing

        Such systems can be easily represented by a graph, and analyzed using GraphX in a distributed, fault tolerant manner.

        ![](/slides/XRM-BigDataPres/images/xrm-024.png)
        $$E = \frac12 \sum_i\sum_{\langle j\rangle_i} J[1 - \delta(S_i - S_j)]$$
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

        ![](/slides/XRM-BigDataPres/images/xrm-025.png) 
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cellular Potts Simulations
        
        ![](/slides/XRM-BigDataPres/images/xrm-026.png) 
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
        ## Beyond: Improving Performance

        Scala code can be slow, but it is very high level and can be automatically translated to CPU or GPU code with projects like ScalaCL

        <div class="code">
          val myData = new Array(1,2,3,4,5) <br>
          val doubleSum = myData.map(\_*2).reduce(\_+\_)
        </div>

        Using **ScalaCL** to run on GPUs with 2-4X performance improvement

        <div class="code">
          val clData = myData.cl
          val doubleSum = clData.map(\_*2).reduce(\_+\_)
        </div>
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## Beyond: Improving Performance

        ### Pipe

        Spark Imaging Layer is fully compatible with the notion of 'pipes' replacing pieces of code with other languages and tools.

        * Python scripts
        * Compiled code
        * GPU processing tools

        We can also automatically choose among (and validate) different tools for the same analysis for increasing performance. Running on your laptop means you can profile code and see exactly where the bottlenecks are ↓ 

        >*Premature Optimization is the source of all evil* - Donald Knuth
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
        ## We have a cool tool, but what does this mean for me?

        A spinoff - [4Quant](http://4quant.com/): From images to insight

        * One Stop Shop
            * Measurement, analysis, and statistical analysis
        * Analysis/Cloud Framework
            * Use our tools on your imaging data
        * Custom Analysis Solutions
            * Custom-tailored software to solve your problems
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## We have a cool tool, but what does this mean for me?

        ### Education / Training

        <i></i>
        * Consulting
            * Advice on imaging techniques, analysis possibilities
        * Education
            * Workshops on Image Analysis
            * Courses - [Quantitative Big Imaging](http://bit.ly/1kj9mnq)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements

        * AIT at PSI
        * TOMCAT Group

        ![](/slides/XRM-BigDataPres/images/xrm-027.png)
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
        * [Quantitative Big Imaging Course at ETH Zurich](http://kmader.github.io/Quantitative-Big-Imaging-2015/)
        * These slides - [https://github.com/4Quant/spark-summit-2014-presentation](https://github.com/4Quant/spark-summit-2014-presentation)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Using Amazon&#39;s Cloud

        We have prepared an introduction to running Spark on the Amazon Cloud: [http://4quant.github.io/aws-spark-introduction/](http://4quant.github.io/aws-spark-introduction/)

        * Setup a cluster with 60 machines in Sydney

        <div class="code">
          ./spark-ec2 -k spark-key -i ~/Downloads/spark-key.pem -s 50 launch big-data-test-cluster --region=ap-southeast-2
        </div>
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## K-Means Optimized (MPI/CUDA)

        Taken from Serban&#39;s K-Means CUDA Project ([https://github.com/serban/kmeans/blob/master/cuda_kmeans.cu](https://github.com/serban/kmeans/blob/master/cuda_kmeans.cu))

        <div class="code big-code">
          checkCuda(cudaMalloc(&deviceObjects, numObjs\*numCoords\*sizeof(float))); <br>
          checkCuda(cudaMalloc(&deviceClusters, numClusters\*numCoords\*sizeof(float))); <br>
          checkCuda(cudaMalloc(&deviceMembership, numObjs\*sizeof(int))); <br>
          checkCuda(cudaMalloc(&deviceIntermediates, numReductionThreads\*sizeof(unsigned int))); <br>
          checkCuda(cudaMemcpy(deviceObjects, dimObjects[0], <br>
            numObjs\*numCoords\*sizeof(float), cudaMemcpyHostToDevice)); <br>
          checkCuda(cudaMemcpy(deviceMembership, membership, <br>
            numObjs\*sizeof(int), cudaMemcpyHostToDevice)); <br>
          do {
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        <div class="code big-code">
          checkCuda(cudaMemcpy(deviceClusters, dimClusters[0], <br>
                          numClusters\*numCoords\*sizeof(float), cudaMemcpyHostToDevice)); <br>
          find\_nearest\_cluster <br>
                    <<< numClusterBlocks, numThreadsPerClusterBlock, clusterBlockSharedDataSize >>> <br>
                    (numCoords, numObjs, numClusters, <br>
                     deviceObjects, deviceClusters, deviceMembership, deviceIntermediates); <br>
          cudaDeviceSynchronize(); checkLastCudaError(); <br>
                compute\_delta <<< 1, numReductionThreads, reductionBlockSharedDataSize >>> <br>
                    (deviceIntermediates, numClusterBlocks, numReductionThreads); <br>
                cudaDeviceSynchronize(); checkLastCudaError(); <br>
                int d; <br>
                checkCuda(cudaMemcpy(&d, deviceIntermediates, <br>
                          sizeof(int), cudaMemcpyDeviceToHost)); <br>
                delta = (float)d; <br>
                checkCuda(cudaMemcpy(membership, deviceMembership, <br>
                          numObjs\*sizeof(int), cudaMemcpyDeviceToHost)); <br>
                for (i=0; i<numObjs; i++) { <br>
                    /\* find the array index of nestest cluster center \*/ <br>
                    index = membership[i]; <br>
          <br>
                    /\* update new cluster centers : sum of objects located within \*/ <br>
                    newClusterSize[index]++; <br>
                    for (j=0; j<numCoords; j++) <br>
                        newClusters[j][index] += objects[i][j]; <br>
                }
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## K-Means Declarative

        1. Starting list of points: **Points**
        1. Take 4 random points from the list → **Centers**
            * Apply a *filter* operation with the function `(random()<nPoints/4)`
        1. Create a function called nearest center which takes a point $\vec x$  and returns the nearest center to the point and the point itself

        <div class="code">
        nearestCenter(x) = { <br>
            for cCenter in Centers <br>
              pointDist(cCenter) = dist(x,cCenter) <br>
            end <br>
            return (argmin(pointDist),x) <br>
          }
        </div>

        1. *Map* `nearestCenter` onto **Points** as **NearestCenterList**
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
        | 1 | 1 | 0.6274510 |
        | 2 | 1 | 0.7803922 |
        | 3 | 1 | 0.8862745 |
        | 4 | 1 | 0.8980392 |
        | 5 | 1 | 0.9098039 |
        | 6 | 1 | 0.9215686 |

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

        <div class="code">
          imgAsKV.count
        </div>

        * Get the first value

        <div class="code">
          imgAsKV.take(1)
        </div>

        * Sample 100 values from the data

        <div class="code">
          imgAsKV.sample(true,0.1,0).collect
        </div>
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

        <div class="code">
          100.0*labelImg.count/(imgAsKV.count)
        </div>
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

        <div class="code">
          val xWidth=100 <br>
          var newLabels=labelImg.map(pvec => (pvec.\_1,(pvec.\_1.\_1.toLong*xWidth+pvec.\_1.\_2+1,true)))
        </div>

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

        <div class="code">
          val labelSize = newLabels. <br>
            map(pvec => (pvec.\_2.\_1,1)). <br>
            reduceByKey((a,b) => (a+b)). <br>
            map(\_.\_2) <br>
          labelSize.reduce((a,b) => (a+b))*1.0/labelSize.count
        </div>

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
        ## Applying Machine Learning to Imaging

        The needs in advertising, marketing, and recommendation engines have powered the creation of a many new machine learning tools capable of processing huge volumes of data. One of the most actively developed projects, MLLib, is a module of Spark and can be directly combined with the *Imaging Layer*
      </script>
    </section>

  </div>
</div>
