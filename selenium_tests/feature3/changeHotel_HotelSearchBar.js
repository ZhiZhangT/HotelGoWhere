const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
  
    // Step 1 - To fetch our server from the browser with our code.
    await driver.get("https://c5g8-esc.onrender.com/hotels?destination=Singapore,%20Singapore&dest_uid=RsBU&checkInDate=2022-08-24&checkOutDate=2022-08-25&numRooms=1&numAdults=2&numChildren=0&currency=SGD");
    await driver.manage().setTimeouts({ implicit: 10000 });
    console.info(await driver.manage().getTimeouts());
  
    // load HotelCards then continue
    let hotelCards = driver.findElement(By.name("HotelCard"));
    console.log("Sleeping for 5s")
    await sleep(5000);
    
    // Choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    console.log("Sleeping for 5s")
    await sleep(5000);

  
    // load HotelCards then continue
    let HotelDetails = driver.findElement(By.name("HotelDetails"));
    console.log("Sleeping")
    await sleep(5000);

    // Step 2 - go back to list of hotels
    await driver.findElement(By.name("goback_HotelSearchBar")).click();
    console.log("Back to Hotels")
    await driver.sleep(5000);

    // TODO: Step 3 - sort by price (low to high) 
    hotelCards = driver.findElement(By.name("HotelCard"));
    // HERE

    // submit
    // Choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    await sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `