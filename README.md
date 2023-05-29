# EPFL COM-480 - New York Citi Bike Analysis

## Introduction

Welcome to our project — a deep dive into the dynamic world of New York City's bike system. Fueled by a profound passion for the complexities of urban transportation, we've embarked on this data-centric journey that blends technology, analytics, urban planning, and environmental sustainability. The vitality of a city and the quality of life it offers to its residents often reflect in its transportation infrastructure, a fact that forms the basis of our research and analysis.

## Data Sources and Methodology

To conduct our research, we have tapped into the API of New York City's bike system. This rich source of data is an open book to the city's past and current trends in bike usage. The datasets we've accumulated span from 2014 to 2020, providing a comprehensive seven-year glimpse into the city's bike usage patterns. But the story doesn't stop here.

To augment our analysis and provide a more complete picture of the city's transportation dynamics, we've incorporated additional datasets into our research. This includes key traffic data from the same time period, which serves as a crucial component in our comparative and holistic analysis approach.

## Tools and Technologies

To bring our data to life, we leveraged the powerful capabilities of the D3.js library. Almost all of our visualizations were created using this potent tool, which has allowed us to represent the data in a captivating and intuitive manner.

For geospatial data representation, we used Leaflet — a leading open-source JavaScript library for mobile-friendly interactive maps. With its extensive features and simplicity, Leaflet has enabled us to create an interactive map of New York City, thereby enriching our spatial analysis of bike usage across the city.

## Purpose and Scope of Analysis

Our analysis is guided by a multifaceted purpose:

1. Understanding Urban Rhythms: Through the data, we seek to decipher the unique rhythms of the city - the how, when, and where of residents' biking choices, and how these choices align with overall traffic trends.

2. Strategic Planning: The data analysis aims to unearth potential bottlenecks in the bike system, reveal hidden opportunities for expansion, and generate actionable insights that could inform policy decisions, ultimately leading to a more bike-friendly city.

## Anticipated Outcomes and Impact

The outcomes we foresee from this project are multifold and impactful:

1. Data-Driven Understanding: We aim to provide a robust, data-driven understanding of New York City's bike usage, a resource that could be indispensable to urban planners, policymakers, and other stakeholders.

2. Future Policy Direction: Insights garnered from our project could guide the direction of future city transportation policies, and help in shaping a more sustainable and environmentally friendly urban mobility landscape.

3. Civic Engagement: By creating visually engaging representations of the data, we hope to foster an active dialogue among citizens, stakeholders, and policymakers about the future of the city's transportation.

## Our Vision

We believe that data and analytics have the power to transform our understanding and decisions about urban spaces. Through this project, we aspire to take a stride towards a future where each journey on a city bike is a thread woven into the fabric of an efficient, sustainable, and healthier city life. Join us as we unravel the fascinating story hidden within the data and together, let's reshape our collective perception of New York City's bike system.


<br>
<br>

# Getting Started

This section will guide you through the necessary steps to clone this repository, setup the environment, and finally run the Jekyll website locally.

## Prerequisites

You will need the following installed on your system:

1. Git
2. Ruby (including development headers)
3. Bundler
4. Jekyll

For detailed instructions on installing these prerequisites, you can visit the following resources:

- [Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Ruby installation guide](https://www.ruby-lang.org/en/documentation/installation/)
- [Bundler installation guide](https://bundler.io/#getting-started)
- [Jekyll installation guide](https://jekyllrb.com/docs/installation/)

## Cloning the Repository

Once the prerequisites are installed, clone the repository by opening a terminal and executing the following command:

```shell
git clone https://github.com/com-480-data-visualization/project-2023-grande-envergure
```

## Checking out the Git LFS Files

This repository uses Git Large File Storage (LFS) for managing datasets. After cloning the repository, ensure you have the correct files by using the following commands:

```shell
cd project-2023-grande-envergure
git lfs install
git lfs pull
````

## Installing Dependencies
Navigate into the project directory and install the necessary Ruby Gems using Bundler:
  
  ```shell
  bundle install
  ```

## Running the Jekyll Server Locally
Finally, you can run the Jekyll server locally using the following command:
```shell
bundle exec jekyll serve
```
Now, open your favorite web browser and enter the following address:
```shell
http://localhost:4000
```

You should be able to see the Jekyll website running locally.