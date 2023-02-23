async function drawLineChart() {
    const dataset = await d3.json(
      "http://127.0.0.1:3007/showLineChart2"
    );
    // Access data
    const dateFormatString = "%Y-%m-%d";
    const dateParser = d3.timeParse(dateFormatString);
    const xAccessor = (d) => dateParser(d.date);
    const yAccessor = (d) => d.Open;

    let dimensions = {
      //590,440
      width: 590,
      height: 440,
      //10 30 30 60
      margin: {
        top: 10,
        right: 30,
        bottom:30,
        left: 60,
      },
    };
    dimensions.boundedWidth =
      dimensions.width -
      dimensions.margin.left -
      dimensions.margin.right;
    dimensions.boundedHeight =
      dimensions.height -
      dimensions.margin.top -
      dimensions.margin.bottom;

    // Draw
    const wrapper = d3
      .select("#wrapper")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    // We can draw our chart inside of a "g" element and shift it all at once using the CSS transform property
    const bounds = wrapper
      .append("g") // Think of "g" as the "div" equivalent within an SVG element
      .style(
        "transform",
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      );

    // const sumstat = d3.nest()
    //   .key(function(d){return d.index1;})
    //   .entries(dataset)

    // Create our scales
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(dataset, yAccessor)) // d3.extent returns an array with the min and max value
      //.domain([0,100])
      .range([dimensions.boundedHeight, 0]) // range refers to the highest and lowest numbers to display

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, xAccessor)) // Use a time scale since we are working with date objects
      .range([0, dimensions.boundedWidth])

    // const color = d3.scaleOrdinal()
    //   .range(['#e41a1c','#377eb8'])

    const lineGenerator = d3
      .line() // Creates a generator that converts data points into a d string
      // Transform our data point with the appropriate accessor and the scale to get the scaled value in pixel space
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    const line = bounds
      .append("path")
      // Feed our dataset to our line generator function
      .attr("d", lineGenerator(dataset))
      // SVG elements default to a black fill and no stroke; which gives us a filled in shape unless we add styling
      .attr("fill", "none")
      .attr("stroke", "#000000")
      //.attr("stroke-linejoin", "round")
      //.attr("stroke-linecap", "round")
      .attr("stroke-width", 1);

    // Additional things to draw (tick marks, labels, legends, etc)

    // Draw y axis tick marks and labels
    const yAxisGenerator = d3
      .axisLeft() // We want labels of the y-axis to be to the left of the axis line
      .scale(yScale);
    // Our axis generator will create lots of element; create a g element to contain them and keep our DOM organized
    const yAxis = bounds.append("g").call(yAxisGenerator);

    // Draw x axis tick marks and labels
    const xAxisGenerator = d3
      .axisBottom() // We want our labels of the x-axis to appear under the axis line
      .scale(xScale);
    const xAxis = bounds
      .append("g")
      .call(xAxisGenerator)
      // If you stop here, the xAxisGenerator knows how to display tick marks and labels relative to the axis line, but we need to move it to the bottom with a CSS transform
      .style("transform", `translateY(${dimensions.boundedHeight}px)`);
  }