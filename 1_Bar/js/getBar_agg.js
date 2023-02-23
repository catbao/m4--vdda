async function drawBar_agg() {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 430,
      height = 400;

    // append the svg object to the body of the page
    const svg = d3
      .select("#wrapper")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    d3.json("http://127.0.0.1:3007/showBar_agg").then(function (data) {
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.a))
        .padding(0);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        //.attr("transform", "translate(-10,0)rotate(-45)")
        //.style("text-anchor", "end");

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 500000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.a))
        .attr("y", (d) => y(d.b))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.b))
        .attr("fill", "#aa11dd");
    });
  }