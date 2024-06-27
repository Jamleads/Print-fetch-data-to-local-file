const fs = require("fs");
const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vemVlbmFoLmF6dXJld2Vic2l0ZXMubmV0L2FwaS92MS9hdXRoL2xvZ2luL21hZ2ljLWxvZ2luIiwiaWF0IjoxNzE5NTA2MTk4LCJleHAiOjE3MTk1MTIxOTgsIm5iZiI6MTcxOTUwNjE5OCwianRpIjoicndFNjhVM252UnJqRllzaSIsInN1YiI6IjgiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.KIDP-zMBL8GeMLso8_xLaZMdpBdml6l8nz7XdbaoxT0`;

const getData = async () => {
  try {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const res = await fetch(
      `https://zeenah.azurewebsites.net/api/v1/payment-methods/payin/countries`,
      config
    );
    const data = await res.json();
    console.log("the data", data);

    //
    const newArray = data?.data.flatMap((entry) =>
      entry.currencies.map((cuntriesCurrencies) => ({
        label: `${entry.name} - ${cuntriesCurrencies.currency} - ${cuntriesCurrencies.method_name}`,
        flag: entry.flag,
        name: entry.name,
        ...cuntriesCurrencies,
      }))
    );
    console.log("the newArray", newArray);
    // Convert the array to a string in JavaScript file format
    const content = `const newArray = ${JSON.stringify(newArray, null, 2)};\n`;

    // Write the content to data.js
    fs.writeFile("data.js", content, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data successfully written to data.js");
      }
    });
  } catch (error) {
    console.log("the error", error);
  }
};

getData();

// const newArray = data?.data.flatMap((entry) =>
//   entry.currencies.map((cuntriesCurrencies) => ({
//     label: `${cuntriesCurrencies.country} - ${cuntriesCurrencies.currency}`,
//     ...cuntriesCurrencies,
//   }))
// );

// // Convert the array to a string in JavaScript file format
// const content = `const newArray = ${JSON.stringify(newArray, null, 2)};\n`;

// // Write the content to data.js
// writeFile("data.js", content, (err) => {
//   if (err) {
//     console.error("Error writing to file:", err);
//   } else {
//     console.log("Data successfully written to data.js");
//   }
// });
