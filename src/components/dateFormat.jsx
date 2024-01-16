/* eslint-disable react/prop-types */
import { format } from "date-fns";

const ConvertDate = ({ captureTime }) => {
  // Ensure captureTime is not null or undefined
  if (!captureTime) {
    return null; // or handle the case when captureTime is not available
  }

  // Extract date and time information
//   const { year = 2020, month = 2, day = 2, hour = 2, minute = 2, second = 2 } = captureTime;

  // Create a Date object with the extracted information
  const dateTime = new Date(
    captureTime?.year,
    captureTime?.month - 1,
    captureTime?.day,
    captureTime?.hour,
    captureTime?.minute,
    captureTime?.second
  );

  // Format the date and time
  const formattedDateTime = format(dateTime, "yyyy-MM-dd HH:mm:ss");

  return (
    <div>
      <p>Capture Time: {formattedDateTime}</p>
    </div>
  );
};

export default ConvertDate;
