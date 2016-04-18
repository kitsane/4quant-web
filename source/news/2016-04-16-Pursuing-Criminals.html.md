---
title: 'Vehicle Tracking'
date: 2016-04-16
---

# Vehicle Tracking

## Pursuing Criminals

SUMMARY_STARTIn a wide range of crimes from grand theft auto to child abduction, it is important to be able to find SUMMARY_ENDthe exact location and reconstruct the past movements of a single vehicle. Some technologies from licence plate recognition at parking garages to on the ground officer deployment are used to alleviate this issue, but finding a single car still proves very difficult, time-consuming, and expensive.

## Real-time Traffic Camera Analytics

Traffic cameras are in wide-spread use for monitoring the movement of cars and identifying problems. The information from these cameras is rich and the combination of an entire network of images can reconstruct the movements of a single vehicle.

<img alt='4Quant' src="images/pursuing-criminals/pc-001.png" class="img-fluid">


The image data on their own are however difficult to process and particularly examining an entire network has typically required hundreds of expensive employees to hand screen the images (approximately 2 per employee). Electronic solutions while existant are typically inflexible, and poorly scalable to the types of problems needed for real-time ad-hoc analysis.

### Real-time image processing

<img alt='4Quant' src="images/pursuing-criminals/pc-002.png" class="img-fluid">

Using our 4Quant SQL, it is now possible to process these streams in a flexible scalable manner to query the live stream of images as if they were all in a database.

~~~
SELECT * FROM TrafficCameras WHERE DETECT_CAR(image)
~~~
