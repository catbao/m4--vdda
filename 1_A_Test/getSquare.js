async function drawSquare() {
    let dataset = await d3.json("http://127.0.0.1:3007/showSquare");
    //console.table(dataset[0])
    const xAccessor = (d) => d.a;
    const yAccessor = (d) => d.b;
    const zAccessor = (d) => d.test;
    let dimensions = {
      //490,290
      width: 890,
      hieght: 590,
      margin: {
        top: 10,
        right: 30,
        bottom: 30,
        left: 60,
      },
    };
    dimensions.boundedWidth =
      dimensions.width -
      dimensions.margin.left -
      dimensions.margin.right;
    dimensions.boundedHeight =
      dimensions.hieght -
      dimensions.margin.top -
      dimensions.margin.bottom;
    const wrapper = d3
      .select("#wrapper")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.hieght);

    const bounds = wrapper
      .append("g")
      .style(
        "transform",
        `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`
      );

    const xScale = d3
      .scaleLinear()
      //.domain([-60,80])
      .domain(d3.extent(dataset,xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      //.domain([-200,200])
      .domain(d3.extent(dataset,yAccessor))
      .range([dimensions.boundedHeight, 0])
      .nice();

    //const zScale = d3.scaleSqrt().domain(d3.extent(dataset,zAccessor)).range([0,8]);

    // const zScale = d3
    //   .scaleLinear()
    //   .domain(d3.extent(dataset, zAccessor))
    //   .range(["skyblue", "red"]);

    const dots = bounds
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(xAccessor(d)))
      .attr("cy", (d) => yScale(yAccessor(d)))
      .attr("r", 1)
      //.attr("r", (d) => zScale(zAccessor(d)))
      .attr("fill", "cornflowerblue");
      //.attr("fill",d => zScale(zAccessor(d)));

    const xAxisGenerator = d3.axisBottom().scale(xScale);
    const xAxis = bounds
      .append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`);

    const xAxisLabel = xAxis
      .append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .style("font-size", "1.4em");
    //.html("a)");

    const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(4);
    const yAxis = bounds.append("g").call(yAxisGenerator);

    const yAxisLabel = yAxis
      .append("text")
      .attr("x", -dimensions.boundedHeight / 2)
      .attr("y", -dimensions.margin.left + 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle");
    //.text("b")
  }