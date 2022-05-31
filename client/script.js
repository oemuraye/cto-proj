const url = "http://localhost:5000/post";

// Fetching Data of Readings
const fetchCurrentData = async () => {
    try {
        const response = await fetch(`${url}/current`);
        const currentDataSet = await response.json();
        console.log(currentDataSet);
        return currentDataSet;
    } catch (error) {
        console.log(error);
    }
};
fetchCurrentData();
    
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
fetchVoltageData()
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
fetchPowerData()


const fetchEnergyData = async () => {
    try {
        const response = await fetch(`${url}/energy`);
        const energySet = await response.json();

        const energyDataSet = energySet.map((({energy}) => energy));
        const time = energySet.map((({createdAt}) => createdAt.slice(0, 10)));

        const energy = {energyDataSet, time};

        return energy;
    } catch (error) {
        console.log(error);
    }
};
// fetchEnergyData()

const energyChart = async () => {
    const {energyDataSet, time} = await fetchEnergyData();
    console.log(time);
    
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
