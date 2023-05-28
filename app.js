let samplesData = d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then()

let samplesID = samplesData['names']
console.log(samplesID[0])

let samplesDemographics = samplesData['metadata']
console.log(samplesDemographics[0])

let samplesPlotData = samplesData['samples']