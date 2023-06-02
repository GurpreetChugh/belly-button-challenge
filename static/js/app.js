// Creating function to insert dropdown values at id="selDataset"
function getOptionValues(my_array) {
  d3.select('#selDataset')
    .selectAll('option')
    .data(my_array.names)
    .enter()
    .append('option')
    .attr('value', value => value
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
        y: sampleValues,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: samplePlotData.otu_ids
        },
        text: samplePlotData.otu_labels
    }

    let layoutBubble = {
      width: 1000,
      height: 600,

      xaxis: {showgrid: false, title: 'OTU-ID'},
      yaxis: {showgrid: false}
    }

    Plotly.newPlot('bubble', [traceBubble], layoutBubble)
}


d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json')
  .then(data => {
    let samplesData = data;
    console.log(samplesData);

    // Calling getOptionValues function
    getOptionValues(samplesData);

    // Calling the init function
    init(samplesData);

    // Creating event handler function
    function optionChanged() {
      let id = this.value;
      let idIndex = samplesData.names.indexOf(id);
      let sampleIdDemographics = samplesData.metadata[idIndex];
      
      // Displaying demographic information for the dropdown selection
      d3.select('#sample-metadata')
        .selectAll('p')
        .data(Object.entries(sampleIdDemographics))
        .join('p')
        .text(d => `${d[0]}: ${d[1]}`);

      //  updating plotly charts

    let sampleIdPlotData = samplesData.samples[idIndex]
    let sampleIdLabels = sampleIdPlotData.otu_ids.map(element => `OTU ${element}`)
    let sampleIdValues = sampleIdPlotData.sample_values

    let updateBar = {
        x: [sampleIdValues.slice(0,10).reverse()],
        y: [sampleIdLabels.slice(0,10).reverse()]
    }

    Plotly.restyle('bar', updateBar)

    console.log(id)
    console.log(samplesData.samples[idIndex].otu_ids)
    console.log(sampleIdValues)

    let updateBubble = {
      x: [sampleIdPlotData.otu_ids],
      y: [sampleIdValues],
      marker: {
        size: sampleIdValues,
        color: samplesData.samples[idIndex].otu_ids
      }
    }

    Plotly.restyle('bubble', updateBubble )  
    }

   //  calling event handler function in an event of selecting an option from dropdown
    d3.select('#selDataset').on('change', optionChanged);
})


// // Creating function to insert dropdown values at id="selDataset"
// function getOptionValues(my_array) {
//   d3.select('#selDataset')
//     .selectAll('option')
//     .data(my_array.names)
//     .enter()
//     .append('option')
//     .attr('value', value => value
//     )
//     .text(value => value)
// }

// // Creating function to initialize default charts and data to display
// function init(data)  {
//     let sampleID = data.names[0]
//     console.log(sampleID) 
//     let sampleDemographics = data.metadata[0]
//     console.log(sampleDemographics)
//     let samplePlotData = data.samples[0]
//     console.log(samplePlotData)
//     let sampleLabels = samplePlotData.otu_ids.map(element => `OTU ${element}`)
//     let sampleValues = samplePlotData.sample_values

//     d3.select('#sample-metadata')
//       .selectAll('p')
//       .data(Object.entries(sampleDemographics))
//       .enter()
//       .append('p')
//       .text(value => `${value[0]} : ${value[1]}`)  
      
//     let traceBar = {
//         x: sampleValues.slice(0,10).reverse(),
//         y: sampleLabels.slice(0,10).reverse(),
//         type: 'bar',
//         orientation: 'h',       
//         text: samplePlotData.otu_labels
//     }

//     let layoutBar = {
//             xaxis: {automargin: true},
//             width: 800,
//             height: 600
//     }

//     Plotly.newPlot('bar', [traceBar], layoutBar)

//     let traceBubble = {
//         x: samplePlotData.otu_ids,
//         y: sampleValues,
//         mode: 'markers',
//         marker: {
//           size: sampleValues,
//           color: samplePlotData.otu_ids
//         },
//         text: samplePlotData.otu_labels
//     }

//     let layoutBubble = {
//       width: 1000,
//       height: 600,

//       xaxis: {showgrid: false, title: 'OTU-ID'},
//       yaxis: {showgrid: false}
//     }

//     Plotly.newPlot('bubble', [traceBubble], layoutBubble)
// }

