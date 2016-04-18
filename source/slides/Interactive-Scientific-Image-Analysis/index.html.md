<div class='reveal'>
  <div class='slides'>

    <section data-markdown>
      <script type='text/template'>
        # Interactive Scientific Image Analysis and Analytics using Spark

        Kevin Mader
        <br>
        Spark East, NYC, 19 March 2015

        ![SIL](/slides/Interactive-Scientific-Image-Analysis/images/isia-001.png)
        ![4Quant](/slides/Interactive-Scientific-Image-Analysis/images/isia-002.png)
        ![Paul Scherrer Institute](/slides/Interactive-Scientific-Image-Analysis/images/isia-003.png)
        ![ETH Zurich](/slides/Interactive-Scientific-Image-Analysis/images/isia-004.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        * Background: Our Technique (why we have big data)
            * X-Ray Tomographic Microscopy
        * Imaging in 2015
        * The Problem(s)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        ### The Tools

        * Spark Imaging Layer
        * 3D Imaging
        * Hyperspectral Imaging
        * Interactive Analysis / Streaming
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        ### The Science

        * Genome Scale Studies
        * Large Datasets
        * Outlook / Developments

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-005.png)
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

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-006.png)

        *[1] Mokso et al., J. Phys. D, 46(49),2013*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        <iframe width='100%' height='700' src='https://www.youtube.com/embed/rV9r_j748t4' frameborder='0' allowfullscreen></iframe>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Synchrotron-based X-Ray Tomographic Microscopy

        <iframe width='100%' height='700' src='https://www.youtube.com/embed/z_c5538xmP8' frameborder='0' allowfullscreen></iframe>

        *Courtesy of M. Pistone at U. Bristol*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Research Image Science in 2015: More and faster

        ### X-Ray

        * Swiss Light Source (SRXTM) images at (>1000fps) → 8GB/s, diffraction patterns (cSAXS) at 30GB/s
        * Nanoscopium (Soleil), 10TB/day, 10-500GB file sizes, very heterogenous data

        ### Optical

        * Light-sheet microscopy (see [talk of Jeremy Freeman](http://spark-summit.org/2014/talk/A-platform-for-large-scale-neuroscience)) produces images → 500MB/s
        * High-speed confocal images at (>200fps) → 78Mb/s
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Research Image Science in 2015: More and faster

        ### Geospatial

        * New satellite projects (Skybox, etc) will measure >10 petabytes of images a year

        ### Personal

        * GoPro 4 Black - 60MB/s (3840 x 2160 x 30fps) for $600
        * [fps1000](https://www.kickstarter.com/projects/1623255426/fps1000-the-low-cost-high-frame-rate-camera) - 400MB/s (640 x 480 x 840 fps) for $400
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Research Image Science in 2015: More and faster

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-007.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How much is a TB, really?

        If **you** looked at one 1000 x 1000 sized image every *second*

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-008.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How much is a TB, really?

        It would take you **139** hours to browse through a terabyte of data.

        | Year | Time to 1 TB | Man power to keep up | Salary Costs / Month |
        | --- | --- | --- | --- |
        | 2000 | 4096 min | 2 people | 25 kCHF |
        | 2008 | 1092 min | 8 people | 95 kCHF |
        | 2014 | 32 min | 260 people | 3255 kCHF |
        | 2016 | 2 min | 3906 people | 48828 kCHF |
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Computing has changed: Parallel

        ### Moores Law

        ### Transistors $∝ 2^{T/(18 months)}$

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-009.png)

        *Based on data from [https://gist.github.com/humberto-ortiz/de4b3a621602b78bf90d](https://gist.github.com/humberto-ortiz/de4b3a621602b78bf90d)*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Computing has changed: Parallel

        There are now many more transistors inside a single computer but the processing speed hasn&#39;t increased. How can this be?

        * Multiple Core
            * Many machines have multiple cores for each processor which can perform tasks independently
        * Multiple CPUs
            * More than one chip is commonly present
        * New modalities
            * GPUs provide many cores which operate at slow speed

        ### Parallel Code is important
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cloud Computing Costs

        The figure shows the range of cloud costs (determined by peak usage) compared to a local workstation with utilization shown as the average number of hours the computer is used each week.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-010.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cloud Computing Costs

        The figure shows the cost of a cloud based solution as a percentage of the cost of buying a single machine. The values below 1 show the percentage as a number. The panels distinguish the average time to replacement for the machines in months

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-011.png)
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
        ## Exploratory Image Processing Priorities

        ### Correctness

        The most important job for any piece of analysis is to be correct.

        * A powerful testing framework is essential
        * Avoid repetition of code which leads to inconsistencies
        * Use compilers to find mistakes rather than users

        ### Easily understood, changed, and used

        Almost all image processing tasks require a number of people to evaluate and implement them and are almost always moving targets

        * Flexible, modular structure that enables replacing specific pieces
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Exploratory Image Processing Priorities

        ### Fast

        The last of the major priorities is speed which covers both scalability, raw performance, and development time.

        * Long waits for processing discourages exploration
        * Manual access to data on separeate disks is a huge speed barrier
        * Real-time image processing requires millisecond latencies
        * Implementing new ideas can be done quickly
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

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-012.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Image Layer

        We have developed a number of commands for SIL handling standard image processing tasks

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-013.png)
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## Spark Image Layer

        <span>
          Fully exensible with
          <img alt='4Quant' class='inline-image' src='/slides/Interactive-Scientific-Image-Analysis/images/isia-014.png'>
        </span>

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-015.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Use case: Hyperspectral Imaging

        Hyperspectral imaging is a rapidly growing area with the potentially for massive datasets and a severe deficit of usuable tools.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-016.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Use case: Hyperspectral Imaging

        The scale of the data is large and standard image processing tools are ill-suited for handling them, although the ideas used in image processing are equally applicable to hyperspectral data (filtering, thresholding, segmentation,…) and distributed, parallel approaches make even more sense on such massive datasets
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Use case: Hyperspectral Imaging

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-017.png)
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

        combine information from nearby pixels

        * Find objects

        determine groups of pixels which are very similar to desired result
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Making Coding Simpler with Types

        ~~~
            trait BasicMathSupport[T] extends Serializable { <br>
                def plus(a: T, b: T): T <br>
                def times(a: T, b: T): T <br>
                def scale(a: T, b: Double): T <br>
                def negate(a: T): T = scale(a,-1) <br>
                def invert(a: T): T <br>
                def abs(a: T): T <br>
                def minus(a: T, b: T): T = plus(a, negate(b)) <br>
                def divide(a: T, b: T): T = times(a, invert(b)) <br>
                def compare(a: T, b: T): Int <br>
            }
        ~~~
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Continuing with Types

        * Simple filter implementation

        ~~~
          def SimpleFilter[T](inImage: Image[T]) <br>
          (implicit val wst: BasicMathSupport[T]) = { <br>
          val width: Double = 1 <br>
          kernel = (pos: D3int,value: T) => value \* exp(-(pos.mag/width)\*\*2) <br>
          kernelReduce = (ptA,ptB) => (ptA + ptB) \* 0.5 <br>
          runFilter(inImage,kernel,kernelReduce) <br>
          }
        ~~~

        * Spectra as well supported types

        ~~~
        implicit val SpectraBMS = new BasicMathSupport[Array[Double]] {
            def plus(a: Array[Double], b: Array[Double]) =
              a.zip(b).map(\_ + \_)
        ...
            def scale(a: Array[Double], b: Double) =
              a.map(_*b)
        ~~~
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Interactive Analysis

        Combining many different components together inside of the Spark Shell, IPython or Zeppelin, make it easier to assemble workflows

        <iframe width='100%' height='600' src='https://www.youtube.com/embed/HHWeMaXGqME' frameborder="0" allowfullscreen></iframe>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Scientific Cases: Genome-scale Imaging

        We want to understand the relationship between genetic background and bone structure

        * With existing tools, analysis is possible and a number of publications have been made, even ones that show differences between strains of mice
        * But
            * n<12
            * time-consuming (years between measurement and publication)
            * not flexible or reproducible
            * not cloud-based
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Scientific Cases: Genome-scale Imaging

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-018.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Genome-Scale Imaging

        Genetic studies require hundreds to thousands of samples, in this case the difference between 717 and 1200 samples is the difference between finding the links and finding nothing.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-019.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Genome-Scale Imaging

        ### 2008 approach - **120 years**

        <i></i>
        * Hand Identification -> 30s / object
        * 30-40k objects per sample
        * One Sample in 6.25 weeks

        ### 2014 approach - **1.5 years**

        * ImageJ macro for segmentation (2-4 hours / sample)
        * Python script for shape analysis (3 hours / sample)
        * Paraview macro for network and connectivity (2 hours / sample)
        * Python script to pool results (3-4 hours)
        * MySQL Database storing results (5 minutes / query)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Genetic Studies using Spark Image Layer

        * Analysis could be completed in several months (instead of 120 years, could now be completed in days in the cloud)
        * Data can be freely explored and analyzed
            * `val bones = sc.loadImages("work/f2_bones/*/bone.tif")`
            * Segment hard and soft tissues

        <div class="code">
          val hardTissue = bones.threshold(OTSU) <br>
          val softTissue = hardTissue.invert
        </div>

        * Label cells

        <div class="code">
          val cells = hardTissue.componentLabel.
          filter(c=>c.size>100 & c.size<1000)
        </div>

        * Export results

        <div class="code">
          cells.shapeAnalysis.WriteOutput("lacuna.csv")
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Parallel Tools for Image and Quantitative Analysis

        * `val cells = sqlContext.csvFile("work/ f2_bones/*/cells.csv")`
        * `val avgVol = sqlContext.sql("select SAMPLE, AVG(VOLUME) FROM cells GROUP BY SAMPLE")`
        * Collaborators / Competitors can verify results and extend on analyses
        * Combine Images with Results
            * `avgVol.filter(_._2>1000).map( sampleToPath).joinByKey(bones)`
            * See immediately in datasets of terabytes which image had the largest cells
        * New hypotheses and analyses can be done in seconds / minutes
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Parallel Tools for Image and Quantitative Analysis

        | Task | Single Core Time | Spark Time (40 cores) |
        | --- | --- | --- |
        | Load and Preprocess | 360 minutes | 10 minutes |
        | Single Column Average | 4.6s | 400ms |
        | 1 K-means Iteration | 2 minutes | 1s |
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Science Problems: Full Brain Imaging

        * Collaboration with A. Astolfo and A. Patera
        * Measure a full mouse brain $1cm^3$ with cellular resolution $1 μ$
        * 10 x 10 x 10 scans at 2560 x 2560 x 2160  → 14 TVoxels
        * *0.000004%* of the entire dataset
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Science Problems: Full Brain Imaging

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-020.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Science Problems: Full Brain Imaging

        * 14TVoxels = 56TB
        * Each scan needs to be registered and aligned together
        * There are no computers with 56TB of memory
        * Even multithreaded approachs are not feasible and require many logistics
        * Analysis of the stitched data is also of interest (segmentation, vessel analysis, distribution and network connectivity)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Science Problems: Big Stitching

        Images: $RDD[((x,y,z),Img[Double])]=[(\vec x ,Img),⋯]$

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-021.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Science Problems: Big Stitching

        ~~~
          dispField = Images. <br>
            cartesian(Images).map{ <br>
            ((xA,ImgA), (xB,ImgB)) => <br>
              xcorr(ImgA,ImgB,in=xB-xA) <br>
            }
        ~~~
        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-022.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## From Matching to Stitching

        From the updated information provided by the cross correlations and by applying appropriate smoothing criteria (if necessary).

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-023.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## From Matching to Stitching

        The stitching itself, rather than rewriting the original data can be done in a lazy fashion as certain regions of the image are read.

        ~~~
          def getView(tPos,tSize) = <br>
            stImgs. <br>
            filter(x=>abs(x-tPos)<img.size). <br>
            map { (x,img) => <br>
             val oImg = new Image(tSize) <br>
             oImg.copy(img,x,tPos) <br>
          }.addImages(AVG)
        ~~~

        This also ensures the original data is left unaltered and all analysis is reversible.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Viewing Regions

        ~~~
          getView(Pos(26.5,13),Size(2,2))
        ~~~

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-024.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Real-time with Spark Streaming: Webcam

        In the biological imaging community, the open source tools of ImageJ2 and Fiji are widely accepted and have a large number of readily available plugins and tools.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-025.png)

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-026.png)

        We can integrate the functionality directly into Spark and perform operations on much larger datasets than a single machine could have in memory. Additionally these analyses can be performed on streaming data.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Real-time with Spark Streaming: Webcam

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-027.png)
      </script>
    </section>


    <section data-markdown>
      <script type='text/template'>
        ## Streaming Analysis Real-time Webcam Processing

        <div class="code">
          val wr = new WebcamReceiver() <br>
          val ssc = sc.toStreaming(strTime) <br>
          val imgList = ssc.receiverStream(wr)
        </div>

        ### Filter images

        <div class="code">
          val filtImgs = allImgs.mapValues(\_.run("Median...","radius=3"))
        </div>

        ### Create a background image

        <div class="code">
          val totImgs = inImages.count() <br>
          val bgImage = inImages.reduce(\_ add \_).multiply(1.0/totImgs)
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Identify Outliers in Streams

        ### Remove the background image and find the mean value

        <div class="code">
          val eventImages = filtImgs. <br>
              transform{ <br>
              inImages => <br>
                val corImage = inImages.map { <br>
                  case (inTime,inImage) => <br>
                    val corImage = inImage.subtract(bgImage) <br>
                    (corImage.getImageStatistics().mean, <br>
                      (inTime,corImage)) <br>
                } <br>
                corImage <br>
            }
        </div>

        ### Show the outliers

        <div class="code">
          eventImages.filter(iv => Math.abs(iv.\_1)>20). <br>
            foreachRDD(showResultsStr("outlier",\_))
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Streaming Demo with Webcam

        <iframe width="100%" height="700" src='https://www.youtube.com/embed/YXwkTPxjAFs' frameborder="0" allowfullscreen></iframe>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## As a scientist (not a data-scientist)

        Apache Spark is **brilliant** platform and utilizing GraphX, MLLib, and other packages there unlimited possibilities

        * Scala can be a beautiful but **not** easy language
        * Python is an easier language
        * Both suffer from
            * Non-obvious workflows
            * Scripts depending on scripts depending on scripts (can be very *fragile*)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## As a scientist (not a data-scientist)

        * Although all analyses can be expressed as a workflow, this is often difficult to see from the code
        * Non-technical persons have little ability to understand or make minor adjustments to analysis
        * Parameters require recompiling to change
        * or GUIs need to be placed on top
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## A basic image filtering operation

        * Thanks to Spark, it is *cached, in memory, approximate, cloud-ready*
        * Thanks to Map-Reduce, it is *fault-tolerant, parallel, distributed*
        * Thanks to Java, it is *hardware agnostic*

        ~~~
          def spread\_voxels(pvec: ((Int,Int),Double), windSize: Int = 1) = { <br>
          val wind=(-windSize to windSize) <br>
          val pos=pvec.\_1 <br>
          val scalevalue=pvec.\_2/(wind.length*wind.length) <br>
          for(x<-wind; y<-wind) <br>
            yield ((pos.\_1+x,pos.\_2+y),scalevalue) <br>
          } <br>
          <br>
          val filtImg=roiImg. <br>
              flatMap(cvec => spread\_voxels(cvec)). <br>
              filter(roiFun).reduceByKey(\_ + \_)
        ~~~

        * But it is also not really so readable
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Little blocks for big data

        Here we use a [KNIME](http://www.knime.org/) -based workflow and our Spark Imaging Layer extensions to create a workflow without any Scala or programming knowledge and with an easily visible flow from one block to the next without any performance overhead of using other tools.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-028.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Little blocks for big data

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-029.png)
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

        * Cloud Image Processing
            * Use our distributed version of ImageJ in the cloud to analyze thousands of remote datasets using your own, ours, or community provided processing routines
        * Custom Analysis Solutions
            * Custom-tailored software to solve your problems
        * One Stop Shop
            * Measurement, analysis, and statistical analysis
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## We have a cool tool, but what does this mean for me?

        ### Education / Training

        <i></i>
        * Consulting
            * Advice on imaging techniques, analysis possibilities
            * Development of new analysis tools and workflows
        * Education
            * Workshops on Image Analysis
            * Courses / Training
            * [Quantitative Big Imaging](http://kmader.github.io/Quantitative-Big-Imaging-2015/)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        * AIT at PSI and Scientific Computer at ETH
        * TOMCAT Group

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-030.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        We are interested in partnerships and collaborations

        ### Learn more at

        <i></i>
        * 4Quant: From Images to Statistics - [http://www.4quant.com](http://www.4quant.com/)
        * X-Ray Imaging Group at ETH Zurich - [http://bit.ly/1gD8wKb](http://bit.ly/1gD8wKb)
        * [Quantitative Big Imaging Course at ETH Zurich](http://kmader.github.io/Quantitative-Big-Imaging-2015/)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Feature Vectors

        **A pairing between spatial information (position) and some other kind of information (value).**

        $$\vec x → \vec f$$

        We are used to seeing images in a grid format where the position indicates the row and column in the grid and the intensity (absorption, reflection, tip deflection, etc) is shown as a different color

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-031.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Feature Vectors

        The alternative form for this image is as a list of positions and a corresponding value

        $$\hat I =(\vec x ,\vec f)$$

        | x | y | Intensity |
        | --- | --- | --- |
        | 1 | 1 | 12 |
        | 2 | 1 | 68 |
        | 3 | 1 | 81 |
        | 4 | 1 | 89 |
        | 5 | 1 | 87 |
        | 1 | 2 | 40 |

        This representation can be called the **feature vector** and in this case it only has Intensity
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why Feature Vectors

        If we use feature vectors to describe our image, we are no longer to worrying about how the images will be displayed, and can focus on the segmentation/thresholding problem from a classification rather than a image-processing stand point.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why Feature Vectors

        ### Example

        So we have an image of a cell and we want to identify the membrane (the ring) from the nucleus (the point in the middle).

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-032.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why Feature Vectors

        A simple threshold doesn&#39;t work because we identify the point in the middle as well. We could try to use morphological tricks to get rid of the point in the middle, or we could better tune our segmentation to the ring structure.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-033.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Adding a new feature

        In this case we add a very simple feature to the image, the distance from the center of the image (distance).

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-034.png)

        | x | y | Intensity | Distance |
        | --- | --- | --- | --- |
        | -10 | -10 | 0.9350683 | 14.14214 |
        | -10 | -9  | 0.7957197 | 13.45362 |
        | -10 | -8  | 0.6045178 | 12.80625 |
        | -10 | -7  | 0.3876575 | 12.20656 |
        | -10 | -6  | 0.1692429 | 11.66190 |
        | -10 | -5  | 0.0315481 | 11.18034 |
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Adding a new feature

        We now have a more complicated image, which we can&#39;t as easily visualize, but we can incorporate these two pieces of information together.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-035.png)
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## Applying two criteria

        Now instead of trying to find the intensity for the ring, we can combine density and distance to identify it

        <div class="code">
          if f(5&#60;Distance&#60;10&0.5&#60;Intensity&#60;1.0)
        </div>

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-036.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Applying two criteria

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-037.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Common Features

        The distance while illustrative is not a commonly used features, more common various filters applied to the image

        * Gaussian Filter (information on the values of the surrounding pixels)
        * Sobel / Canny Edge Detection (information on edges in the vicinity)
        * Entroy (information on variability in vicinity)

        | x | y | Intensity | Sobel | Gaussian |
        | --- | --- | --- | --- | ---- |
        | 1 | 1 | 0.94 | 0.32 | 0.53 |
        | 1 | 10 | 0.48 | 0.50 | 0.45 |
        | 1 | 11 | 0.50 | 0.50 | 0.46 |
        | 1 | 12 | 0.48 | 0.64 | 0.46 |
        | 1 | 13 | 0.43 | 0.78 | 0.45 |
        | 1 | 14 | 0.33 | 0.94 | 0.42 |
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Common Features

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-038.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Analyzing the feature vector

        The distributions of the features appear very different and can thus likely be used for identifying different parts of the images.

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-039.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Analyzing the feature vector

        Combine this with our *a priori* information (called supervised analysis)

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-040.png)
        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-041.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Using Machine Learning

        Now that the images are stored as feature vectors, they can be easily analyzed with standard Machine Learning tools. It is also much easier to combine with training information.

        | x | y | Absorb | Scatter | Training |
        | --- | --- | --- | --- |
        | 700 | 4 | 0.3706262 | 0.9683849 | 0.0100140 |
        | 704 | 4 | 0.3694059 | 0.9648784 | 0.0100140 |
        | 692 | 8 | 0.3706371 | 0.9047878 | 0.0183156 |
        | 696 | 8 | 0.3712537 | 0.9341989 | 0.0334994 |
        | 700 | 8 | 0.3666887 | 0.9826912 | 0.0453049 |
        | 704 | 8 | 0.3686623 | 0.8728824 | 0.0453049 |
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Using Machine Learning

        Want to predict Training from x,y, Absorb, and Scatter → MLLib: Logistic Regression, Random Forest, K-Nearest Neighbors, …

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-042.png)
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

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-043.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hadoop Filesystem (HDFS not HDF5)

        Bottleneck is filesystem connection, many nodes (10+) reading in parallel brings even GPFS-based infiniband system to a crawl

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-044.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hadoop Filesystem (HDFS not HDF5)

        One of the central tenants of MapReduce™ is data-centric computation → instead of data to computation, move the computation to the data.

        * Use fast local storage for storing everything redundantly → less transfer and fault-tolerance
        * Largest file size: 512 yottabytes, Yahoo has 14 petabyte filesystem in use

        ![](/slides/Interactive-Scientific-Image-Analysis/images/isia-045.png)
      </script>
    </section>

  </div>
</div>
