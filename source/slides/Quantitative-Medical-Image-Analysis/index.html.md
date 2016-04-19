<div class='reveal'>
  <div class='slides'>

    <section data-markdown>
      <script type='text/template'>
        # Quantitative Medical Image Analysis in the Cloud using Big Data Approaches

        Kevin Mader
        <br>
        LifeScienceForumBasel, 18 June 2015

        ![SIL](/slides/Quantitative-Medical-Image-Analysis/images/qmia-001.png)
        ![Paul Scherrer Institute](/slides/Quantitative-Medical-Image-Analysis/images/qmia-002.png)
        ![ETH Zurich](/slides/Quantitative-Medical-Image-Analysis/images/qmia-003.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        * Introduction
            * Quantitative?
            * Big?
        * Small Data vs Big Data
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        ###The Tools

        * Spark Image Layer
        * Quantitative Search Engine for Images
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Outline

        ### The Science

        * Academic Projects
        * Commercial Projects
        * Outlook / Developments

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-004.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Lung Imaging

        Look for potentially cancerous nodules in the following lung image, taken from [NPR](http://www.npr.org/sections/health-shots/2013/02/11/171409656/why-even-radiologists-can-miss-a-gorilla-hiding-in-plain-sight)

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-005.jpg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Lung Imaging

        * 83% of Harvard Radiologists thought this scan looked perfectly normal
        * [http://www.npr.org/sections/health-shots/2013/02/11/171409656/why-even-radiologists-can-miss-a-gorilla-hiding-in-plain-sight](http://www.npr.org/sections/health-shots/2013/02/11/171409656/why-even-radiologists-can-miss-a-gorilla-hiding-in-plain-sight)
        * called *inattentional blindness*
            * since the focus was on counting cancerous lung nodules
            * standard sanity checks were never made
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why quantitative?

        ### Human vision system is imperfect

        Which center square seems brighter?

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-006.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Why quantitative?

        ### Are the intensities constant in the image?

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-007.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Overwhelmed: Bone Physiology

        * There is a complex relationship between the macroscopic bone strength and the microscopic cellular networks inside of them.
        * Examining the individual cells can give us insights into what makes for healthy and pathological bone growth
        * Count how many cells are in the bone slice
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Overwhelmed: Bone Physiology

        1. Ignore the ones that are ‘too big’ or shaped ‘strangely’
        2. Are there more on the right side or left side?
        3. Are the ones on the right or left bigger, top or bottom?
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Overwhelmed: Bone Physiology

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-008.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## More overwhelmed

        Do it all over again for 96 more samples, this time with 2000 slices instead of just one!

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-009.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## A Genome Level Study

        * Genetic studies require hundreds to thousands of samples
        * ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-010.png)
        * For this study, the difference between 717 and 1200 samples is the difference between finding the **links** and finding *nothing*.
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## A Genome Level Study

        * Now again with 1090 samples!
        * ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-011.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## It gets even better

        * Those metrics were quantitative and could be easily visually extracted from the images
        * What happens if you have softer metrics
        * ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-012.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## It gets even better

        * How aligned are these cells?
        * Is the group on the left more or less aligned than the right?
        * errr?
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Scaling Radiologists

        As the amount of data increases

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-013.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        But how do radiologists / experts scale

        * Expensively
            * [Median salary $468,594](https://www.econ.berkeley.edu/sites/default/files/roth_nicholas.pdf) → $245 / hour
        * Poorly
            * Reading twice as fast → 2.5X as many [errors](http://www.healthimaging.com/topics/diagnostic-imaging/slow-down-speed-readers-faster-radiology-reporting-times-result-more-major-mistakes)
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

        * New satellite projects (Skybox, etc) will measure >10 petabytes of images a year

        ### Personal

        * GoPro 4 Black - 60MB/s (3840 x 2160 x 30fps) for $600
        * [fps1000](https://www.kickstarter.com/projects/1623255426/fps1000-the-low-cost-high-frame-rate-camera) - 400MB/s (640 x 480 x 840 fps) for $400
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

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-014.png)
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

        ![Internal Structures](/slides/Quantitative-Medical-Image-Analysis/images/qmia-015.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## How much is a TB, really?

        If **you** looked at one 1000 x 1000 sized image every *second*

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-016.png)
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
        ## Small Data vs Big Data

        **Big Data** is a very popular term today. There is a ton of hype and seemingly money is being thrown at any project which includes these words. First to get over the biggest misconception **big data isn&#39;t about how much data you have, it is how you work with it**.

        Before we can think about *Big Data* we need to define what it&#39;s replacing, *Small Data*.
      </script>
    </section>

    <section data-markdown>
      <!-- TODO: missed video https://rawgit.com/4Quant/LSFB2015/master/LFSBPres.html#/14 -->
      <script type='text/template'>
        ## Small Data vs Big Data

        ### Small Data

        The 0815 approach, using standard tools and lots of clicking, one image at a time
      </script>
    </section>

    <section data-markdown>

      <script type='text/template'>
        ## Small Data: Genome-Scale Imaging

        * Hand Identification → 30s / object
        * 30-40k objects per sample
        * One Sample in 6.25 weeks
        * 1300 samples → **120 man-years**

        <video controls='controls' data-autoplay>
            <source src='../video/SmallData-Fast.mp4' type='video/mp4'>
            Your browser does not support the video tag.
        </video>
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Small Data: Genome-Scale Imaging

        **Advantages**

        * Hand verification of every sample, visual identification of errors and problems

        **Disadvantages**

        * Biased by user
        * Questionable reproducibility
        * Time-consuming
        * Exploration challenging
        * Data versioning is difficult
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Medium Data: Genome-scale Imaging

        * ImageJ macro for segmentation
        * Python script for shape analysis
        * Paraview macro for network and connectivity
        * Python/MPI script to pool results
        * MySQL Database storing results

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-017.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Medium Data: Genome-scale Imaging

        *1.5 man-years*

        **Advantages**

        * Faster than manual methods
        * Less bias
        * More reproducible
        * Can be highly optimized / performant

        **Disadvantages**

        * Compartmentalized analysis
        * Time-consuming
        * Complex interdependent workflow
        * Fragile (machine crashes, job failures)
        * Expensive - Measure *twice, cut once*, not exploratory
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Exploratory Image Analysis Priorities

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
        ## Exploratory Image Analysis Priorities

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

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-018.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Spark Image Layer

        We have developed a number of commands for SIL handling standard image processing tasks

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-019.png)
      </script>
    </section>
    <section data-markdown>
      <script type='text/template'>
        ## Spark Image Layer

        <span>
          Fully exensible with
          <img alt='4Quant' class='inline-image' src='/slides/Quantitative-Medical-Image-Analysis/images/qmia-020.png'>
        </span>

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-021.png)
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

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-022.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images

        ### ↓Perform analysis on a every image

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-023.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Quantitative Search Machine for Images

        ### ↓Filter out the most anisotropic cells

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-024.png)
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

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-025.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Distribution and Analysis

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-026.svg)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Distribution and Analysis

        Once processed into Spark commands the query can be executed on multiple machines using multiple data storage environments in the background

        * Data-locality ensures analysis is run efficiently on the same machine it is stored on
        * Network communication fully managed
        * Fault tolerance of nodes ensured
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Large Computation on the Cloud

        ###For the same price as a single radiologist, you get (each blue dot is 20 computers):

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-027.svg)
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

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-028.png)
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

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-029.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The next step: From Big Data to improving health-care?

        ### From Research to the Clinic

        * New algorithms can be tested on all patient data just as easily as 10
        * Streaming analysis can be applied to all new patients in a streaming manner

        ### Automatic Analysis

        * Instead of piecewise, single algorithms in fancy tools
        * Test new algorithms against hundreds or even millions of **labeled** data to validate and find the best ones
        * Apply the best ones to all data, automatically
        * Assist radiologists and physicians by **augmenting** not replacing them
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The vision

        ### Instead of

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-030.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## The vision

        ### We have

        * Healthy ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-031.png)
        * Sick ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-032.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## We have a cool tool, but what does this mean for me?

        A spinoff - [4Quant](http://4quant.com/): From images to insight

        * Quantitative Search Machine for Images
            * **Find all patients with livers larger than 10cm diameter**
            * **Count the number of highly anisotropic nuclei in myeloma patients**
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

        * Consulting
            * Advice on imaging techniques, analysis possibilities
        * Education
            * Workshops on Image Analysis
            * Courses / Training
            * [Quantitative Big Imaging](http://kmader.github.io/Quantitative-Big-Imaging-2015/)
        * Contact Us: [contact@4quant.com](mailto:contact@4quant.com)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: 4Quant

        ### Flavio Trolese

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-033.png)

        ### Dr. Prat Das Kanungo

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-034.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: 4Quant

        ### Dr. Ana Balan

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-035.png)

        ### Prof. Marco Stampanoni

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-036.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        * TOMCAT Group
        * Radiology Team at the Universitaetspital Basel
        * Keith Cheng from Penn State Medical Center
        * AIT at PSI and Scientific Computer at ETH

        ![](/slides/Quantitative-Medical-Image-Analysis/images/qmia-037.png)
      </script>
    </section>

    <section data-markdown>
      <script type='text/template'>
        ## Acknowledgements: ETH and PSI

        ### We are interested in partnerships and collaborations

        **Learn more at**

        * 4Quant: From Images to Statistics - [http://www.4quant.com](http://www.4quant.com/)
        * [Quantitative Big Imaging Course at ETH Zurich](http://kmader.github.io/Quantitative-Big-Imaging-2015/)
        * X-Ray Imaging Group at ETH Zurich - [http://bit.ly/1gD8wKb](http://bit.ly/1gD8wKb)
      </script>
    </section>
  </div>
</div>
