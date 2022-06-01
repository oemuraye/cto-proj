const url = "http://localhost:5000/post";

// Fetching Data of Readings
const fetchCurrentData = async () => {
  try {
    const response = await fetch(`${url}/current`);
    const currentDataSet = await response.json();

    const currentData = currentDataSet.map(({ current }) => current);
    console.log(currentData);
    return currentData;
  } catch (error) {
    console.log(error);
  }
};
// fetchCurrentData();

const fetchVoltageData = async () => {
  try {
    const response = await fetch(`${url}/voltage`);
    const voltageDataSet = await response.json();
    console.log(voltageDataSet);
    return voltageDataSet;
  } catch (error) {
    console.log(error);
  }
};
// fetchVoltageData();
const fetchPowerData = async () => {
  try {
    const response = await fetch(`${url}/power`);
    const powerDataSet = await response.json();
    console.log(powerDataSet);
    return powerDataSet;
  } catch (error) {
    console.log(error);
  }
};
// fetchPowerData();

const fetchEnergyData = async () => {
  try {
    const response = await fetch(`${url}/energy`);
    const energySet = await response.json();

    const energyDataSet = energySet.map(({ energy }) => energy);
    const time = energySet.map(({ createdAt }) => createdAt.slice(0, 10));

    const energy = { energyDataSet, time };

    return energy;
  } catch (error) {
    console.log(error);
  }
};
// fetchEnergyData()

// Displaying Readings in Chart
const energyChart = async () => {
  const { energyDataSet, time } = await fetchEnergyData();

  const labels = [...time];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Energy dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [...energyDataSet],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };

  const myChart = new Chart(document.getElementById("energy-chart"), config);
  return myChart;
};

energyChart();

const currentGuage = async () => {
  const currentData = await fetchCurrentData();
  const current = currentData[currentData.length - 1];
  let data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: current,
      title: { text: "Current - I" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 1000], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "green" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 250], color: "red" },
          { range: [250, 400], color: "#fe7900" },
          { range: [400, 600], color: "yellow" },
          { range: [600, 800], color: "#84cc00" },
          { range: [800, 1000], color: "green" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 999,
        },
      },
    },
  ];

  let layout = {
    width: 600,
    height: 500,
    margin: { t: 0, b: 0 },
    paper_bgcolor: "lavender",
  };
  Plotly.newPlot("current-gauge", data, layout);
};
currentGuage();
