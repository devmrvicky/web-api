// * dom references
const btryLvl = document.querySelector(".battery-level");
const btryLvlProg = document.querySelector(".battery-level-progress-bar");
const estimateTime = document.querySelector(".estimate-time");
const chargingIcon = document.querySelector(".charging-icon");

// * fetch all battery information
const getBtryInfo = async () => {
  const btryInfo = await navigator.getBattery();
  return btryInfo;
};

// * update charging level
const updateChargingLvl = (level) => {
  if (level >= 0.95) {
    btryLvlProg.style.borderRadius = `20px 20px 20px 20px`;
  }
  btryLvl.replaceChildren(
    document.createTextNode(`${Math.round(level * 100)} %`)
  );
  btryLvlProg.style.width = `${level * 100}%`;
  document.querySelector(".battery").title = `Battery status : ${
    level === 1 ? "Full" : `${level * 100}%`
  }`;
};

// * calculate estimate time in hours and minute from second
const calculateTimeInHMFormate = (time) => {
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  return `${hours ? `${hours} h` : ""} ${minutes} min`;
};

// * update charging time when charger plugged in
const updateChargingTime = (time) => {
  estimateTime.textContent = `estimate charging time : ${
    time === Infinity ? "Not calculated" : calculateTimeInHMFormate(time)
  }`;
};

// * update discharging time when charger plugged out
const updateDischargingTime = (time) => {
  estimateTime.textContent = `estimate discharging time : ${
    time === Infinity ? "Not calculated" : calculateTimeInHMFormate(time)
  }`;
};

// * call both update time function in updateEstimateTime function on the charging condition
//* if charging is true updateChargingTime function will be call else updateDischargingTime function will be call
const updateEstimateTime = (chargingTime, dischargingTime, charging) => {
  if (charging) {
    updateChargingTime(chargingTime);
  } else {
    updateDischargingTime(dischargingTime);
  }
};

// * toggle charging icon on the condition of charger plugged in or plugged out
const toggleChargingIcon = (charging) => {
  if (charging) {
    chargingIcon.classList.add("show-charging-icon");
  } else {
    chargingIcon.classList.remove("show-charging-icon");
  }
};

// * main function this function is calling getBtryInfo and distribute all needed info about battery to function
const setBtryInfo = async () => {
  const btryInfo = await getBtryInfo();
  const { charging, chargingTime, dischargingTime, level } = btryInfo;

  toggleChargingIcon(charging);
  updateChargingLvl(level);
  updateEstimateTime(chargingTime, dischargingTime, charging);

  btryInfo.addEventListener("chargingchange", (e) => {
    updateEstimateTime(
      e.currentTarget.chargingTime,
      e.currentTarget.dischargingTime,
      e.currentTarget.charging
    );
    toggleChargingIcon(e.currentTarget.charging);
  });

  btryInfo.addEventListener("levelchange", (e) => {
    updateChargingLvl(e.currentTarget.level);
  });
  btryInfo.addEventListener("chargingtimechange", (e) => {
    updateChargingTime(e.currentTarget.chargingTime);
  });
  btryInfo.addEventListener("dischargingtimechange", (e) => {
    updateDischargingTime(e.currentTarget.dischargingTime);
  });
};
setBtryInfo();
