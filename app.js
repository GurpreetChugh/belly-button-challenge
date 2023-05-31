
d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json')
  .then(data => {
    let samplesData = data;
    console.log(samplesData);
    getOptionValues(samplesData);
    init(samplesData);
})

// Creating function to insert dropdown values at id="selDataset"

function getOptionValues(my_array) {
  d3.select('#selDataset')
    .selectAll('option')
    .data(my_array.names)
    .enter()
    .append('option')
    .attr('values', value => value
    )
    .text(value => value)
}

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
        text: samplePlotData.otu_labels
    }

    let layoutBar = {
            xaxis: {automargin: true},
            width: 800,
            height: 600
    }

    Plotly.newPlot('bar', [traceBar], layoutBar)

    let traceBubble = {
        x: samplePlotData.otu_ids,
        y: samplePlotData.sample_values,
        mode: 'markers',
        marker: {
          size: samplePlotData.sample_values,
          color: samplePlotData.otu_ids
        },
        text: samplePlotData.otu_labels
    }

    let layoutBubble = {
      width: 1000,
      height: 600,
      xaxis: {showgrid: false},
      yaxis: {showgrid: false}
    }

    Plotly.newPlot('bubble', [traceBubble], layoutBubble)
}

// Creating Event handler function
function optionChanged(id) {
    // capturing the index of the sample id selected on dropdown and displaying the demographic for that sample id
    idIndex = samplesData.names.indexOf(id)
    d3.select('#sample-metadata')
      .selectAll('p')
      .data(Object.entries(sampleDemographics[idIndex]))
      .enter()
      .append('p')
      .text(value => `${value[0]} : ${value[1]}`) 
    
      // updating plotly charts
      sampleIdLabels = samplesData.samples[idIndex].otu_ids.map(element => `OTU ${element}`)
      sampleIdValues = samplesData.samples[idIndex].sample_values
      let idtraceBar = {
        x: sampleIdValues.slice(0,10).reverse(),
        y: sampleIdLabels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h',       
        text: samplesData.samples[idIndex].otu_labels
    }

    let idlayoutBar = {
            xaxis: {automargin: true},
            width: 800,
            height: 600
    }

    Plotly.newPlot('bar', [traceBar], layoutBar)

    let idtraceBubble = {
        x: samplePlotData.otu_ids,
        y: samplePlotData.sample_values,
        mode: 'markers',
        marker: {
          size: samplePlotData.sample_values,
          color: samplePlotData.otu_ids
        },
        text: samplePlotData.otu_labels
    }

    let idlayoutBubble = {
      width: 1000,
      height: 600,
      xaxis: {showgrid: false},
      yaxis: {showgrid: false}
    }

  
}




    

    
    









