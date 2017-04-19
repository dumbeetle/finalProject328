$(document).ready(function(){
    $("input").click(function(){
        var select;
        var questions=document.getElementsByName("sales");
        for(var i =0;i<questions.length;i++){
            if(questions[i].checked == true){
                select = questions[i].value;
                if(select=="EUNA"){
                    runNAEU();
                }else if(select=="JNA"){
                    runJNA();
                }else if(select=="JEU"){
                    runJEU();
                }
            }

            }


    });


});





function runNAEU(){
    /**
     * Created by weapo on 4/12/2017.
     */
//get all data from csv
    d3.csv('VGDATAclean.csv', function (data) {
        // create variables for the sizes
        var body = d3.select('body');
        var margin = { top: 200, right: 200, bottom: 200, left: 200 };
        var h = 900- margin.top - margin.bottom;
        var w = 900 - margin.left - margin.right;
        //create a scale based on the size of the data
        var colorScale = d3.scale.category20();
        var xScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.NA_Sales })]),
                d3.max([0,d3.max(data,function (d) { return d.NA_Sales })])
            ])
            .range([0,w]);
        var yScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.NA_Sales})]),
                d3.max([0,d3.max(data,function (d) { return d.NA_Sales})])
            ])
            .range([h,0]);
        // SVG
        var svg = body.append('svg')
            .attr('height',h + margin.top + margin.bottom)
            .attr('width',w + margin.left + margin.right)
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')');
        // X-axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(d3.formatPrefix("1",1e6))
            .ticks(5)
            .orient('bottom');
        // Y-axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(d3.formatPrefix("1",1e6))
            .ticks(5)
            .orient('left');
        // Circles
        var circles = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx',function (d) { return xScale(d.NA_Sales) })
            .attr('cy',function (d) { return yScale(d.EU_Sales) })
            .attr('r','10')
            .attr('stroke','black')
            .attr('stroke-width',1)
            .attr('fill',function (d,i) { return colorScale(i) })
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('r',20)
                    .attr('stroke-width',3)
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('r',10)
                    .attr('stroke-width',1)
            })
            .append('title') // Tooltip
            .text(function (d) { return d.Name +
                '\nYear: ' + d.Year_of_Release+
                '\nGenre: ' + d.Genre+
                '\nNorth American Sales: ' + d.NA_Sales+
                '\nEuropean Sales: ' + d.EU_Sales
            });
        // X-axis
        svg.append('g')
            .attr('class','axis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
            .append('text') // X-axis Label
            .attr('class','label')
            .attr('y',30)
            .attr('x',300)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('North American Sales by Millions');
        // Y-axis
        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis)
            .append('text') // y-axis Label
            .attr('class','label')
            .attr('transform','rotate(-90)')
            .attr('x',-100)
            .attr('y',-50)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('European Sales by Millions')
    });
}
function runJEU(){
    d3.csv('VGDATAclean.csv', function (data) {
        // create variables for the sizes
        var body = d3.select('body');
        var margin = { top: 200, right: 200, bottom: 200, left: 200 };
        var h = 900- margin.top - margin.bottom;
        var w = 900 - margin.left - margin.right;
        //create a scale based on the size of the data
        var colorScale = d3.scale.category20();
        var xScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.NA_Sales })]),
                d3.max([0,d3.max(data,function (d) { return d.NA_Sales })])
            ])
            .range([0,w]);
        var yScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.NA_Sales})]),
                d3.max([0,d3.max(data,function (d) { return d.NA_Sales})])
            ])
            .range([h,0]);
        // SVG
        var svg = body.append('svg')
            .attr('height',h + margin.top + margin.bottom)
            .attr('width',w + margin.left + margin.right)
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')');
        // X-axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(d3.formatPrefix("1",1e6))
            .ticks(5)
            .orient('bottom');
        // Y-axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(d3.formatPrefix("1",1e6))
            .ticks(5)
            .orient('left');
        // Circles
        var circles = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx',function (d) { return xScale(d.JP_Sales) })
            .attr('cy',function (d) { return yScale(d.EU_Sales) })
            .attr('r','10')
            .attr('stroke','black')
            .attr('stroke-width',1)
            .attr('fill',function (d,i) { return colorScale(i) })
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('r',20)
                    .attr('stroke-width',3)
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('r',10)
                    .attr('stroke-width',1)
            })
            .append('title') // Tooltip
            .text(function (d) { return d.Name +
                '\nYear: ' + d.Year_of_Release+
                '\nGenre: ' + d.Genre+
                '\nNorth American Sales: ' + d.JP_Sales+
                '\nEuropean Sales: ' + d.EU_Sales
            });
        // X-axis
        svg.append('g')
            .attr('class','axis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
            .append('text') // X-axis Label
            .attr('class','label')
            .attr('y',30)
            .attr('x',300)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('Japanese Sales by Millions');
        // Y-axis
        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis)
            .append('text') // y-axis Label
            .attr('class','label')
            .attr('transform','rotate(-90)')
            .attr('x',-100)
            .attr('y',-50)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('European Sales by Millions')
    });
}

function runJNA(){
    d3.csv('VGDATAclean.csv', function (data) {
        // create variables for the sizes
        var body = d3.select('body');
        var margin = { top: 200, right: 200, bottom: 200, left: 200 };
        var h = 900- margin.top - margin.bottom;
        var w = 900 - margin.left - margin.right;
        //create a scale based on the size of the data
        var colorScale = d3.scale.category20();
        var xScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.NA_Sales })]),
                d3.max([0,d3.max(data,function (d) { return d.NA_Sales })])
            ])
            .range([0,w]);
        var yScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.NA_Sales})]),
                d3.max([0,d3.max(data,function (d) { return d.NA_Sales})])
            ])
            .range([h,0]);
        // SVG
        var svg = body.append('svg')
            .attr('height',h + margin.top + margin.bottom)
            .attr('width',w + margin.left + margin.right)
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')');
        // X-axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(d3.formatPrefix("1",1e6))
            .ticks(5)
            .orient('bottom');
        // Y-axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(d3.formatPrefix("1",1e6))
            .ticks(5)
            .orient('left');
        // Circles
        var circles = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx',function (d) { return xScale(d.NA_Sales) })
            .attr('cy',function (d) { return yScale(d.EU_Sales) })
            .attr('r','10')
            .attr('stroke','black')
            .attr('stroke-width',1)
            .attr('fill',function (d,i) { return colorScale(i) })
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('r',20)
                    .attr('stroke-width',3)
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('r',10)
                    .attr('stroke-width',1)
            })
            .append('title') // Tooltip
            .text(function (d) { return d.Name +
                '\nYear: ' + d.Year_of_Release+
                '\nGenre: ' + d.Genre+
                '\nNorth American Sales: ' + d.NA_Sales+
                '\nEuropean Sales: ' + d.EU_Sales
            });
        // X-axis
        svg.append('g')
            .attr('class','axis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
            .append('text') // X-axis Label
            .attr('class','label')
            .attr('y',30)
            .attr('x',300)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('North American Sales by Millions');
        // Y-axis
        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis)
            .append('text') // y-axis Label
            .attr('class','label')
            .attr('transform','rotate(-90)')
            .attr('x',-100)
            .attr('y',-50)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('European Sales by Millions')
    });
}