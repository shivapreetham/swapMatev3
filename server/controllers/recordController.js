const calculateAttendance = (attendedClasses, totalClasses) => {
    const attendancePercentage = (attendedClasses / totalClasses) * 100;
    const isAbove75 = attendancePercentage >= 75;
    let classesNeeded = 0;
    let classesCanSkip = 0;
  
    if (!isAbove75) {
      classesNeeded = Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25);
    } else {
      classesCanSkip = Math.floor((attendedClasses - 0.75 * totalClasses) / 0.75);
    }
  
    return {
      attendancePercentage,
      isAbove75,
      classesNeeded,
      classesCanSkip,
    };
  };
  
  module.exports = calculateAttendance;
  