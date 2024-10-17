const fs = require('fs');
let jsonData;
fs.readFile('Crimes_acts.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
         jsonData = JSON.parse(data);
        console.log("fetched")
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

const search=(crimename)=>{
    if (!jsonData) {
        return 'Data not loaded yet.';
    }
    const result=jsonData.crimes.filter((crime)=>{
       return  crime.offense.toLowerCase()===crimename.toLowerCase();
    });


return result.length > 0? result : 'crime not fount';
}
setTimeout(()=>{console.log((search("murder")).map((ele)=>`${ele.offense}-${ele.section_id}--${ele.act_name}--${ele.imprisonment_period}--${ele.fine}--${ele.act_id}`))},1000)
   
