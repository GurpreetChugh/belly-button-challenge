
d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json')
  .then(data => {
    let samplesData = data;
    init(samplesData);
})

// Creating function to initialize default charts and data to display
function init(data)  {
    let sampleID = data.names[0]
    console.log(sampleID) 
    let sampleDemographics = data.metadata[0]
    console.log(sampleDemographics)
    let samplePlotData = data.samples[0]
    console.log(samplePlotData)
    let sampleLabels = samplePlotData.otu_ids.map(element => `OTU ${element}`)
    let sampleValues = samplePlotData.sample_values

    d3.select('#selDataset')
      .selectAll('option')
      .data(sampleID)
      .enter()
      .append('option')
      .attr('value', sampleID)
      .text(sampleID)

    d3.select('#sample-metadata')
      .selectAll('p')
      .data(Object.entries(sampleDemographics))
      .enter()
      .append('p')
      .text(value => `${value[0]} : ${value[1]}`)  
      
    let traceBar = {
        x: sampleValues.slice(0,10).reverse(),
        y: sampleLabels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h',
        // width: 1,
        text: samplePlotData.otu_labels
    }

    let layoutBar = {
            xaxis: {automargin: true},
            width: 800,
            height: 600
        }
    Plotly.newPlot('bar', [traceBar], layoutBar)

    let traceBubble = {}
}

// Creating function







    

    
    









