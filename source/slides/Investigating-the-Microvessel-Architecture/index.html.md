<div class='reveal'>
  <div class='slides'>

    <section data-markdown>
      <script type='text/template'>
        # Investigating the Microvessel Architecture of the Mouse Brain

        An approach for measuring, stitching, and analyzing 50 terabytes of data
        <br>
        K. Mader, A. Patera, A. Astolfo, M. Schneider, B. Weber, M. Stampanoni (4quant.com/SRI2015)

        ![SIL](Investigating-the-Microvessel-Architecture/itma-001.png)
        ![Paul Scherrer Institute](Investigating-the-Microvessel-Architecture/itma-002.png)
        ![ETH Zurich](Investigating-the-Microvessel-Architecture/itma-003.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        * Imaging in 2015
        * Brain-scale Vasculature
        * Traditional Approaches
        * Our Approach
            * Stitching
            * Searching
            * Streaming
        * Outlook / Developments

        ![Internal Structures](/slides/Investigating-the-Microvessel-Architecture/images/itma-004.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Image Science in 2015: More and faster

        ### X-Ray

        * Swiss Light Source (SRXTM) images at (>1000fps) → 8GB/s, diffraction patterns (cSAXS) at 30GB/s
        * Nanoscopium (Soleil), 10TB/day, 10-500GB file sizes, very heterogenous data
        * Swiss Radiologists will make 1PB of data year

        ### Geospatial

        * New satellite projects (Skybox, etc) will measure >10 petabytes of images a year
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Image Science in 2015: More and faster

        ### Personal

        * [fps1000](https://www.kickstarter.com/projects/1623255426/fps1000-the-low-cost-high-frame-rate-camera) - 400MB/s (640 x 480 x 840 fps) for $400
        * GoPro 4 Black - 60MB/s (3840 x 2160 x 30fps) for $600
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Time Breakdown

        The breakdown of science into component tasks has changed from a time perspective over the last years and how we expect it to change by 2020.

        * Experiment Design (Pink)
        * Data Management (Blue)
        * Measurement Time (Green)
        * Post Processing (Purple)

        The primary trends to focus on are the rapid decrease in measurement time and increasing importantance of post-processing.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Time Breakdown

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-005.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Science or IT?

        The breakdown of science into component tasks has changed from a time perspective over the last years and how we expect it to change by 2020.

        * Experiment Design (Pink)
        * Data Management (Blue)
        * Measurement Time (Green)
        * Post Processing (Purple)

        The primary trends to focus on are the rapid decrease in measurement time and increasing importantance of post-processing.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Science or IT?

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-006.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Mouse Brain: Full Vascular Imaging

        * Collaboration with A. Astolfo and A. Patera
        * Measure a full mouse brain ($1cm^3$) with cellular resolution ($1 μ$ m)
        * 10 x 10 x 10 scans at 2560 x 2560 x 2160  → 14 TVoxels
        * *0.000004%* of the entire dataset
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Mouse Brain: Full Vascular Imaging

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-007.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Mouse Brain: Full Vascular Imaging

        * 14TVoxels = 56TB
        * Each scan needs to be registered and aligned together
        * There are no computers with 56TB of memory
        * Analysis of the stitched data is also of interest (segmentation, vessel analysis, distribution and network connectivity)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The Scanning

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-008.svg)

        ### Thank you Alessandra and Alberto!
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The Scanning

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-009.png)

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-010.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Let&#39;s Stitch

        The first of challenges with these data is to start stitching them together.

        * Algorithmically it is very simple:
        * $Overlap_{A→B}=$
        * $argmax_{\vec x}[FT^{−1} \\{ FT \\{ A \\} FT \\{ B \\} ^∗ \\} ]$

        ### Computationally

        We need to stitch each scan with all of its neighbors

        * $x=±1$
        * $y=±1$
        * $z=±1$
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Let&#39;s Stitch

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-011.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How does that look?

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-012.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How does that look?

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-013.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## But it gets better

        We have a few more parameters ($θ$) and we know the initial positions so we optimize in a limited range rather than the entire image.

        * → we need to add another loop
        * Iterate as long as the offset vectors are changing
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## But it gets better

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-014.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Execute

        Now that our task is clear we just execute →

        ### Super workstation

        <i></i>
        * **160GB** RAM
        * **awesome**-sauce graphics card
        * **40 cores** with hyperthreading
        * SSD drives

        ### Matlab + FIJI

        <i></i>
        * Premade algorithms
        * Just click and go
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Execute

        * 10x10x10 scans x 8 neighbors → 8,000 registrations per iteration
        * 20 - 40 minutes per registration
        * 1000-4000 hours → 40-160 days per iteration
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## A Cluster?

        ### Basic Topology

        <i></i>
        * Driver Node

        The machine being used by the user which is responsible for creating jobs which need to run

        * Master Node

        Distributes task across multiple machines, coordinates communication between machines

        * Worker Nodes

        The nodes where the compuation is actually done
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## A Cluster?

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-015.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Using a cluster

        * → Tell the *driver* to load all images
        * The *driver* determines which data need to be loaded
        * *Driver → Master* exact data to load

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-016.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Steps

        <i></i>
        * tell machine 1 to load images 0 to 2
        * tell machine 2 to load images 3 to 5
        * …
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Steps

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-017.svg)
        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-018.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Exchanging Images

        tell share the images to calculate the overlap

        * → tell machine 1 to send image 0 to machine 2
        * → tell machine 2 to calculate: $Overlap(A→B)$
        * …
        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-019.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Problems

        * Every task on every machine must be explicitly specified
        * Substantial effort in coordination
        * Huge amounts of data traffic between shared storage and machines
        * Not flexible or *elastic*
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Problems

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-020.png)
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
        ## Big Data

        ### Velocity, Volume, Variety

        When a ton of heterogeneous is coming in fast.

        **Performant, scalable, and flexible**

        ### When scaling isn&#39;t scary

        10X, 100X, 1000X is the same amount of effort

        ### When you are starving for enough data

        Director of AMPLab said their rate limiting factor is always enough interesting data

        ### O 'clicks' per sample
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Big Data

        ### Question not implementation driven

        Ask the questions you **should** not the questions you **can**

        You **conduct** the orchestra, you don&#39;t spend time telling each person what to do

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-021.png)
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

        ### Apache Spark

        * **World Record Holder** for Terabyte and Petabyte Sort
            * 100TB of data on 206 machines in 23 minutes
            * 1PB of data in 190 machines in <4 hours
        * Scalable
            * &#62;10000 computers
            * storing and processing exabytes of data
            * sustained data rates of 3Gb/s/node (map) and 1.1Gb/s/node (reduce)
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

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-022.png)
      </script>
    </section>

   <section data-markdown>
      <script type='text/template'>
        ## Spark Image Layer

        We have developed a number of commands for SIL handling standard image processing tasks

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-023.png)
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## Spark Image Layer

        <span>
          Fully exensible with
          <img alt='4Quant' class='inline-image' src='/slides/Investigating-the-Microvessel-Architecture/images/itma-024.png'>
        </span>

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-025.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How do we get started?

        * First we start our cluster: <br>
        spark-ec2.py -s 50 launch 4quant-image-cluster
        * Load all of the samples (56TB of data)

        <div class="code">
        loadImage( <br>
          "s3:/../brain_*_*_*/rec.tif" <br>
          )
        </div>

        A Resilient Distributed Dataset (RDD)
        Images: $RDD[((x,y,z),Img[Double])]=[(\vec x ,Img),⋯]$
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## How do we get started?

        * Now start processing, run a gaussian filter on all the images to reduce the noise

        <div class="code">
         filteredImages = Images.gaussianFilter(1,0.5)
        </div>

        * Calculate the volume fraction at a threshold of 50%

        <div class="code">
         volFraction = Images.threshold(0.5). <br>
          map{keyImg => <br>
            (sum(keyImg.img),keyImg.size) <br>
            }.reduce(_+_)
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Stitching?

        We have all of the filtered images and we want to stitch them together in a smart way.

         * Start simple and match the images up with its neighbors (all image permutations and filter out the proximal ones)
         pairImages = Images.

        <div class="code">
          cartesian(Images).
          filter((im1,im2) => dist(im1.pos,im2.pos)<1)
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Stitching?

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-026.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cross Correlating

        The cross correlation can then be executed on each pair of images from the new RDD (*pairImages*) by using the **map** command

        <div class="code">
          displacementField = pairImages. <br>
            map{ <br>
            ((posA,ImgA), (posB,ImgB)) => <br>
         <br>
              xcorr(ImgA,ImgB, <br>
                in=posB-posA) <br>
         <br>
            }
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cross Correlating

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-027.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## From Matching to Stitching

        From the updated information provided by the cross correlations and by applying appropriate smoothing criteria across windows.

        <div class="code">
          smoothField = displacementField. <br>
              window(3,3,3). <br>
              map(gaussianSmoothFunction)
        </div>

        This also ensures the original data is left unaltered and all analysis is reversible.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Viewing Regions

        The final stiching can then be done by

        <div class="code">
          alignImages. <br>
            filter(x=>abs(x-tPos)<img.size). <br>
            map { (x,img) => <br>
             new Image(tSize). <br>
              copy(img,x,tPos) <br>
            }.combineImages()
        </div>

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-028.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Searching?

        New detectors certainly provide a substantial amount of new data, but what about old data?

        * At PSI we have years of tape archives with thousands of interesting experiments.
        * At hospitals and satellite imaging companies it is even more

        ### PI:

        Look at this new technique from **famous journal**, let&#39;s try it on **all** of our old data

        ### PhD Student:

        * Find old data
        * Copy old data one disk at a time to current machine
        * Read in old data, Run analysis, Save results
        * Repeat from 2.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Searching?

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-029.png)

        ### 2 years later

        It seems to give the same results

        ### PI

        Well what about **this** technique?

        ###Repeat ad naseaum
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## It doesn&#39;t need to be like this

        * Amazon provides cheep, universally acessible (but **secure**) storage
        * Amazon provides cheap, powerful computational resources
        * Spark / Spark Image Layer provides the glue to match the data to the computation to the science

        <div class="code">
          allData = loadPSIImages("s3://psi-data/femur-bones/\*.tif") ++
          loadAPSImages("s3://aps-data/bone-images/\*.hdf5") ++
          loadESRFImages("s3://esrf-data/femur-bones/\*.tif")
        </div>

        <div class="code">
          allData.registerImageMetaTable("BoneImages")
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Now something interesting?

        How many of the bone samples measured had a cortical thickness larger than 30mm?

        <div class="code">
          SELECT COUNT(*) FROM ( <br>
            SELECT THICKNESS( <br>
              SEGMENT_CORTICAL( <br>
                GAUSSFILT(imgData) <br>
              ) <br>
            ) AS thk WHERE thk>30 <br>
          )
        </div>

        Is there a correlation between cortical thickness and mineral content?

        <div class="code">
          SELECT THICKNESS(cortical), <br>
            IMG_AVG(cortical) FROM ( <br>
            SELECT SEGMENT_CORTICAL( <br>
              GAUSSFILT(imgData) <br>
              ) AS cortical <br>
            )
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Image Query Engine: A PhD in 9 lines

        <div class="code">
          CREATE TABLE FilteredBones AS
          SELECT sampleId,GaussianFilter(image) FROM BoneImages
        </div>
        <div class="code">
          CREATE TABLE ThresholdImages AS
          SELECT boneId,ApplyThreshold(image,OTSU) FROM FilteredBones
        </div>
        <div class="code">
          CREATE TABLE CellImages AS
          SELECT boneId,ComponentLabel(image) FROM PorosityImages
        </div>
        <div class="code">
          CREATE TABLE CellAnalysis AS
          SELECT boneId,AnalyzeShape(CellImages) FROM CellImages GROUP BY boneId
          WRITE TABLE CellAnalysis "s3n://bones/cells.csv"
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Distribution and Analysis

        The query is processed by the SQL parsing engine

        * sent to the database where it can be combined with locally available private data
        * sent to the image layer for all image processing components to be integrated
        * sent to the Spark Core so specific map, reduce, fold operations can be generated
        * sent to the master node where it can be distributed across the entire cluster / cloud
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Distribution and Analysis

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-030.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Distribution and Analysis

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-031.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Many Nodes

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-032.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Streaming: Real-time Image Processing

        In the biological imaging community, the open source tools of ImageJ2 and Fiji are widely accepted and have a large number of readily available plugins and tools.

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-033.png)
        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-034.png)

        We can integrate the functionality directly into Spark and perform operations on much larger datasets than a single machine could have in memory. Additionally these analyses can be performed on streaming data.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Streaming: Real-time Image Processing

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-035.svg)
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
          val filtImgs = allImgs.mapValues(_.run("Median...","radius=3"))
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
        ## We have a cool tool, but what does this mean for me?

        A spinoff - [4Quant](http://4quant.com/): From images to insight

        * Quantitative Search Machine for Images
            * Make analyzing huge sets of image data like a database search
        * Custom Analysis Solutions
            * Custom-tailored software to solve your problems
            * Streaming / Acquisition Solutions
            * Integration with Image Database Systems
            * Cloud Solutions
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
        * Contact Us: [contact@4quant.com](mailto:contact@4quant.com)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## We support Open, Reproducible Science

        While our framework is commercial, we build on top and integrate into open-source tools so that the research is reproducible by anyone, anywhere, using any machine (it just might take a bit longer)

        * [ImageJ2](http://fiji.sc/ImageJ2)
        * [KNIME](http://www.knime.org/)
        * [BigDataViewer](http://fiji.sc/BigDataViewer)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## We support Open, Reproducible Science

        We also try to publish as much code, educational material, and samples as possible on our github account.

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-036.png)

        * [https://github.com/4Quant](https://github.com/4Quant)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: 4Quant

        ### Flavio Trolese

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-037.png)

        ### Dr. Prat Das Kanungo

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-038.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: 4Quant

        ### Dr. Ana Balan

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-039.png)

        ### Prof. Marco Stampanoni

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-040.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        * AIT at PSI and Scientific Computer at ETH
        * TOMCAT Group

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-041.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        We are interested in partnerships and collaborations

        ### Learn more at

        <i></i>
        * 4Quant: From Images to Statistics - [http://www.4quant.com](http://www.4quant.com/)
        * [Quantitative Big Imaging Course at ETH Zurich](http://kmader.github.io/Quantitative-Big-Imaging-2015/)
        * X-Ray Imaging Group at ETH Zurich - [http://bit.ly/1gD8wKb](http://bit.ly/1gD8wKb)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Small Data vs Big Data

        **Big Data** is a very popular term today. There is a ton of hype and seemingly money is being thrown at any project which includes these words. First to get over the biggest misconception **big data isn&#39;t about how much data you have, it is how you work with it**.

        Before we can think about *Big Data* we need to define what it&#39;s replacing, *Small Data*.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Small Data vs Big Data

        ### Small Data

        The 0815 approach, using standard tools and lots of clicking, one image at a time

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-042.png)
      </script>
    </section>

    <!-- TODO: missed video https://rawgit.com/4Quant/SRI2015/master/SRIPres.html#/43 -->
    <section data-markdown>
      <script type='text/template'>
        ## Small Data: Single Sample Clicking

        * Hand Identification → 30s / object
        * 30-40k objects per sample
        * One Sample in 6.25 weeks
        * 1300 samples → **120 man-years**
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Small Data: Single Sample Clicking

        ### Advantages
        <i></i>
        * Hand verification of every sample, visual identification of errors and problems

        ### Disadvantages
        <i></i>
        * Biased by user
        * Questionable reproducibility
        * Time-consuming
        * Exploration challenging
        * Data versioning is difficult
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How much is a TB, really?

        If **you** looked at one 1000 x 1000 sized image every *second*

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-043.png)
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
        ## Top Down Science

        The standard approach to producing data is top-down.

        * Selecting a model
        * generating hypotheses
        * conducting experiments
        * updating the model.

        In a study with 80 samples with a variability of 10% and a 5% difference between them, we can afford only 1 test and maintain the commonly accepted $p<0.05$

        We thus need *smart people* making and choosing the best models so that we can preserve the signifance.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Top Down Science

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-044.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Letting Data Drive: From models to probability

        > *Rather than impose a preconceived, possibly biased, model on data we should investigate what possible models, interpretations, or correlations are in the data (possibly in the phenomena) that might help us understand it.* - Michael Brodie: MIT and Former Chief Scientist at Verizon

        The Big Data era suggests a new approach. First given an abundance of data, we can afford to run many tests.

        In a study with 800 samples with a variability of 10% and a 5% difference between them, we can afford over 10M tests and maintain the commonly accepted $p<0.05$
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Letting Data Drive: From models to probability

        For knowledge creation this means a switch

        * from long, arduous studies involving careful model selection
        * to hypothesis and model creation based on the correlations and trends found in the raw data

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-045.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Computing has changed: Parallel

        ### Moores Law

        ### Transistors $∝ 2^{T/(18 months)}$

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-046.png)

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

        The range of cloud costs (determined by peak usage) compared to a local workstation with utilization shown as the average number of hours the computer is used each week.

        * People usually only work ~40 hours a week (in europe at least)
        * Adding IT costs and management easily shifts the blue cruve substantially upward.

      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cloud Computing Costs

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-047.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Medium Data: Multi-tool Scripting

        * ImageJ macro for segmentation
        * Python script for shape analysis
        * Paraview macro for network and connectivity
        * Python/MPI script to pool results
        * MySQL Database storing results

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-048.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Medium Data: Multi-tool Scripting

        **1.5 man-years**

        ### Advantages

        <i></i>
        * Faster than manual methods
        * Less bias
        * More reproducible
        * Can be highly optimized / performant

        ### Disadvantages

        * Compartmentalized analysis
        * Time-consuming
        * Complex interdependent workflow
        * Fragile (machine crashes, job failures)
        * Expensive - *Measure twice, cut once*, not exploratory
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Compartmentalized

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-049.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cost Comparison: Why this hasn&#39;t been done before?

        For many traditional scientific studies, the sample count is fairly low 10-100, for such low counts, if we look at the costs (estimated from our experience with cortical bone microstructure and rheology)

        * Development costs are very high for Big
        * Traditionally students are much cheaper than the 150kCHF / year used in this model
        * Medium Data is a good compromise
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Cost Comparison: Why this hasn&#39;t been done before?

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-050.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Scaling Costs

        As studies get bigger (>100 samples), we see that these costs begin to radically shift.

        * The high development costs in Medium and Big → 0
        * The high human costs of Small and Medium $∝ Samples$
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Scaling Costs

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-051.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Pathological Slices

        *Count the number of highly anisotropic nuclei in myeloma patients*

        ### ↓Translate to SQL

        <div class='code'>
          SELECT COUNT(*) FROM <br>
            (SELECT SHAPE_ANALYSIS(LABEL_NUCLEI(pathology\_slide)) FROM patients <br>
            WHERE disease LIKE "myleoma") <br>
            WHERE anisotropy > 0.75
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Pathological Slices

        ### ↓Load Myleoma Data Subset

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-052.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Pathological Slices

        ### ↓Perform analysis on a every image

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-053.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Pathological Slices

        ### ↓Filter out the most anisotropic cells

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-054.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Maps

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-055.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Maps

        *Find all strongly reflective large objects within 1km of Paul Scherrer Intitute, Villigen, CH*

        ### ↓Translate to SQL

        <div class='code'>
          SELECT contour FROM ( <br>
            SELECT COMPONENT_LABEL(THRESHOLD(tile,200)) FROM esriTiles <br>
            WHERE DIST(LAT,-47.53000992328762,LONG,8.215198516845703)<1 <br>
            ) WHERE area>200
        </div>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Maps

        ### We can then visualize these contours easily

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-056.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images: Maps

        ### or apply them back to the original map

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-057.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hadoop Filesystem (HDFS not HDF5)

        Bottleneck is filesystem connection, many nodes (10+) reading in parallel brings even GPFS-based infiniband system to a crawl

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-058.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Hadoop Filesystem (HDFS not HDF5)

        One of the central tenants of MapReduce™ is data-centric computation → instead of data to computation, move the computation to the data.

        * Use fast local storage for storing everything redundantly → less transfer and fault-tolerance
        * Largest file size: 512 yottabytes, Yahoo has 14 petabyte filesystem in use

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-059.png)
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
        ## Interactive Analysis

        Combining many different components together inside of the Spark Shell, IPython or Zeppelin, make it easier to assemble workflows

        ### Web and Image Database Examples

        <iframe width='100%' height='600' src='https://www.youtube.com/embed/HHWeMaXGqME' frameborder="0" allowfullscreen></iframe>
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
        ## A basic image filtering operation

        * Thanks to Spark, it is *cached, in memory, approximate, cloud-ready*
        * Thanks to Map-Reduce, it is *fault-tolerant, parallel, distributed*
        * Thanks to Java, it is *hardware agnostic*

        <div class='code'>
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
        </div>

        * But it is also not really so readable
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Little blocks for big data

        Here we use a [KNIME](http://www.knime.org/) -based workflow and our Spark Imaging Layer extensions to create a workflow without any Scala or programming knowledge and with an easily visible flow from one block to the next without any performance overhead of using other tools.

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-060.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Little blocks for big data

        ![](/slides/Investigating-the-Microvessel-Architecture/images/itma-061.png)
      </script>
    </section>

  </div>
</div>
