---
title: 'Capsule Endoscopy Video Analytics'
date: 2016-04-16
---

# Capsule Endoscopy Video Analytics

## Identifying Diseased Tissue in Capsule Endoscopy Movies

SUMMARY_STARTCapsule endoscopy is a particularly innovative way for diagnosing a number of conditions without requiring surgical or otherwise invasive proceduresSUMMARY_END. The self-contained capsule is simple swallowed and videos are recorded of the patients digestive track. The usual passing time of 24-48 hours means that a significant amount of video data is created for each patient and much of it is not diagnostically relevant. Viewing and finding the ‘needles’ in this haystack of data is very time consuming and can cause many minor details to be missed.

## Image Query and Analysis Engine

The input videos can be 24 hours or longer so for this example we just show a small section of the video below and the steps for quantitative image analysis (taken from [https://www.youtube.com/watch?v=zBYbFQzldtU](https://www.youtube.com/watch?v=zBYbFQzldtU)).

### Sifting through old data

<img alt='4Quant' src="images/capsule-endoscopy/ce-001.png">

### Filter out samples with unique features

<div class="half-width-image">
  <img alt='4Quant' src="images/capsule-endoscopy/ce-002.png">
  <img alt='4Quant' src="images/capsule-endoscopy/ce-003.png">
</div>

### Real-time Processing

<div class="half-width-image">
  <img alt='4Quant' src="images/capsule-endoscopy/ce-004.gif">
  <img alt='4Quant' src="images/capsule-endoscopy/ce-005.gif">
  <img alt='4Quant' src="images/capsule-endoscopy/ce-006.gif">
</div>


### How?

The first question is how the data can be processed. The basic work is done by a simple workflow on top of our Spark Image Layer. This abstracts away the complexities of cloud computing and distributed analysis. You focus only on the core task of image processing.

<div class='half-width-image'>
  <img alt='4Quant' src='images/capsule-endoscopy/ce-007.svg'>
</div>

The true value of such a scalable system is not in the single analysis, but in the ability to analyze hundreds, thousands, and even millions of samples at the same time.

<img alt='4Quant' src="images/capsule-endoscopy/ce-008.svg">

With cloud-integration and Big Data-based frameworks, even handling an entire city network with 100s of drones and cameras running continuously is an easy task without worrying about networks, topology, or fault-tolerance.

### What?

The images which are collected by the capsule continuously and converted into a video. We can then analyze each frame of the video to identify interesting sites.

<img alt='4Quant' src="images/capsule-endoscopy/ce-009.png">

The first step in this identification is to segment the frame into so-called superpixels, a standard technique for grouping similar regions together and makes examining textures and other parameters much easier.

<img alt='4Quant' src="images/capsule-endoscopy/ce-010.png">
<img alt='4Quant' src="images/capsule-endoscopy/ce-011.png">

The data can be then analyzed in more detail to extract quantitatively meaningful metrics on the structure of the tissue.

<img alt='4Quant' src="images/capsule-endoscopy/ce-012.png">

From all of the images general trends can be identified by examining all of the phenotypes and trying to identify the important ones for differentiating disease. The following figure shows the relationship between shape (of the super-pixels) and the healthy segments as pink dots and the abnormal as blue dots. The shape and position provide some differentation but are not definitive enough to clearly distinguish the two groups.

<img alt='4Quant' src="images/capsule-endoscopy/ce-013.png">

Here we show the relative color components for each channel (red, green, and blue) and how they are related to the tissue labeled as healthy and abnormal.

<img alt='4Quant' src="images/capsule-endoscopy/ce-014.png">

Here rather than showing the relative intensities we show the median absolute deviation which is better at characterizing the variation inside each structure.

<img alt='4Quant' src="images/capsule-endoscopy/ce-015.png">

The results can also be summarized as statistical outputs for comparing the phenotypes values for the groups of normal and abnormal tissue.


|             | Abnormal    | Normal      | p.overall |
|   ---       | ---         | ---         | ---       |
|             | N=407       | N=20828     |           |
| Centroid.X  | 369 (141)   | 319 (159)   | <0.001    |
| Centroid.Y  | 221 (87.6)  | 179 (89.6)  | <0.001    |
| Circularity | 0.44 (0.16) | 0.50 (0.16) | <0.001    |
| Convexity   | 0.87 (0.06) | 0.88 (0.07) | <0.001    |
| Mean_blue   | 0.27 (0.01) | 0.21 (0.03) | 0.000     |
| Mean_green  | 0.43 (0.02) | 0.47 (0.05) | <0.001    |
| Mean_red    | 0.30 (0.02) | 0.31 (0.03) | <0.001    |
| MAD_blue    | 1.94 (1.01) | 1.85 (1.18) | 0.093     |
| MAD_green   | 1.78 (0.89) | 1.61 (0.92) | <0.001    |
| MAD_red     | 2.09 (1.08) | 2.06 (1.37) | 0.517     |

The intensities of the healthy and unusual tissues can be easily compared on such a graph where it is clear that the relative amounts of blue and green play an important role in differentiating the normal and abnormal structures.

<img alt='4Quant' src="images/capsule-endoscopy/ce-016.png">

### Machine Learning

The quantitatively meaningful data can then be used to train machine learning algorithms (decision trees to SVM) in order to automatically high-light many of the interesting regions and label them as such, dratistically reducing the required time to analyze a single patient.

Here we show a simple decision tree trained to identify lesions using color, position, texture and shape.

<img alt='4Quant' src="images/capsule-endoscopy/ce-017.png">

The subtree responsible for color-based analysis. Given a large set of data the trees can be more robustly tested and improved to provide the highest sensitivity and specificity criteria.

<div class='half-width-image'>
  <img alt='4Quant' src='images/capsule-endoscopy/ce-018.png'>
</div>

Furthermore the ability to parallelize and scale means thousands to millions of videos can be analyzed at the same time to learn even more about the structures of the digestive track and identify new possibilities for diagnosis.

## Technical Aspects

### Processing the Data

Once the cluster has been comissioned and you have the SparkContext called `sc` (automatically provided in [Databricks Cloud](https://databricks.com/product/databricks) or [Zeppelin](http://zeppelin.incubator.apache.org/), the data can be loaded using the Spark Image Layer. Since we are using real-time analysis, we acquire the images from an archive of images and create a database out of the results.

<div class="code">
  val iqaeDB = sc.createImageDatabase("s3n://capsule-endoscopy/scans/*/*.avi",<br>
  patientInfo="jdbc://oracle-db/PATIENTS") <br>
  iqaeDB.registerImageTable("Endoscopy")
</div>

Although we execute the command on one machine, the analysis will be distributed over the entire set of cluster resources available to `sc`. To further process the images, we can take advantage of the rich set of functionality built into Spark Image Layer.

The entire pipeline can then be started to run in real-time on all the new images as they stream in. If the tasks become more computationally intensive, then the computing power can be scaled up and down elastically.

### Learn More

To find out more about the technical aspects of our solution, check out our presentation at the [Spark Summit](http://4quant.com/spark-east-2015) or watch the [video](https://www.youtube.com/watch?v=ohR_y7HZaHA&index=10&list=PL-x35fyliRwiy50Ud2ltPx8_yA4H34ppJ).
Check out our other demos to see how 4Quant can help you:

* [Check train tracks in real time](http://4quant.com/Railway-Check)
* [Count people from drone footage](http://4quant.com/Drone-People-Counting)
* [Track criminals in cars using traffic cameras](http://4quant.com/Pursuing-Criminals/)
* [Counting Cars in Satellite Images](http://4quant.com/countingcarsdemo)
* [Finding buildings and forests in Satellite Images](http://4quant.com/geospatialdemo/)
