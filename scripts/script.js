
//! Fetch Json from data.json
const data = fetch('data.json')
    .then( response => response.json() )
    .then( data => {
        console.log(data)
        return data;
    })
    .catch(error => console.log(error))
    
    const chartContainer = document.querySelector('.graphics');
    
let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
let amounts = [];

data.then( res => {
    for( let i = 0; i < res.length; i++) {
        amounts[i] = res[i].amount
    }
    res.forEach(item => {
        // ? Se crea un DIV y se le agrega la clase "day"
        const chart = document.createElement('DIV');
        chart.classList.add(`${item.day}`);
        chart.classList.add('day');

        
        let active;
        const today = new Date().toUTCString().slice(0, 3).toLowerCase();
        item.day == today ? active = 'active' : active = 'graph'

        
        // console.log(today)
        // <div class="dialog" id="dialog">$${item.amount}</div>
        
        chart.innerHTML = `
            <div class="${active}" id="barras" style="height: ${Math.round(item.amount * 3)}px"></div>
            <div">${item.day}</div>
            
        `;

        chartContainer.appendChild(chart);

    });
})


data.then( res => {
    res.forEach( item => {
        // console.log(item)
        const barras = document.querySelectorAll('#barras');

        barras.forEach( barra => {
            const dialog = document.querySelectorAll('#dialog');

            barra.addEventListener('mouseenter', (ev) => {
                const containerAmount = document.createElement('DIV');

                const curDayHov = ev.target.parentNode;
                let curDayHovClass = curDayHov.className.slice(0, 3);
                console.log(curDayHovClass)

                // getAmount()

                function getAmount() {
                    for(let index in days) {

                        console.log(index)
                        if(days[index] == curDayHovClass) {
                            if(days[index] == 'sun') return amounts[6];
                            return amounts[index -1];
                        }
                    }
                }
                
                if(!document.querySelector('.show')) {
                    containerAmount.classList.add('show');
                    containerAmount.textContent = `$${getAmount()}`;

                    curDayHov.insertBefore(containerAmount,curDayHov.firstChild)
                } 
                    
                


            })

            barra.addEventListener('mouseleave', (ev) => {
            
                let curDayHov = ev.target.parentNode;
                
                if(document.querySelector('.show')) {
                    
                    curDayHov.removeChild(curDayHov.firstElementChild)
                } 
            })

        })  
    })
})








// const barras = document.querySelectorAll('#barras');
// barras.forEach( barra => {
//     barra.addEventListener('mouseenter', (ev) => {
        
//         const amountDiv = document.createElement('DIV');
//         const curDayHov = ev.target.parentNode;
//         // console.log(curDayHov)

//         let curDayHovClass = curDayHov.className;
//         // console.log(curDayHovClass)
        
//         getAmount()
//         function getAmount() {
//             for(let index in item.day) {
//                 let arrayday = [...item.day]
//                 if(item.day[index] == curDayHovClass) {
//                     if(item.day[index] == 'sun') return amounts[6];
//                     return amounts[index -1];
//                 }
                    

//                     console.log(arrayday)
//             }
//         }

//         amountDiv.classList.add('show');

//         amountDiv.textContent = `$${getAmount()}`;
//         curDayHov.insertBefore(amountDiv,curDayHov.firstChild)
//         // amountDiv.style.bottom = `${ev.target.clientHeight+40}px`

//     }) 

//     barra.addEventListener('mouseleave', (ev) => {
//         let curDayHov = ev.target.parentNode;
//         curDayHov.removeChild(curDayHov.firstElementChild)
//     })
    
// })

// // console.log(graficas)