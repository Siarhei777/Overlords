export default async () => {
    const response = await fetch('./data/data.json');
    if (!response) {
        alert('Error!');        
    }
    const data = await response.json();    
    return data.sort(function(a, b) {
        if (a.type > b.type) {
          return 1;
        }
        if (a.type < b.type) {
          return -1;
        }    
        return 0;
    });        
}