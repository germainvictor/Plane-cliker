/*************************************************
                 Variables global 
*************************************************/
var game = {};
// Create new variable
game.elements = {};
game.elements.content = document.querySelector('.zoneGame');
game.elements.ticket = document.querySelector('.ticket');
game.elements.money = document.querySelector('.money');
game.elements.valuation = document.querySelector('.valuation');
game.elements.planes = document.querySelectorAll('.planes_infos');
game.elements.planes_quantity = document.querySelectorAll('.planes_quantity');
game.elements.tweet = document.querySelector('.tweet')

money = 1; // 


var canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d');

/*************************************************
                      data 
*************************************************/

if (!localStorage.getItem('data')) {

    var data = {
        inventory: { // List of inventory
            money: 0, // how much money the user have
            autoclick: 0, // how much autoclick bonus
            multiplier: 1, // how much multiplier bonus
            partnership: 1, // how much partnershipn bonus
            valorisation: 0, // value of the compagny
            spent_on_planes: 0,
        },
        planes: { // list of planes
            hot_air_balloon: {
                name: 'hot air balloon',
                cost: 30,
                value: 1,
                number: 1,
                source: 'src/img/1.png',
                queue: 1,
            },

            airship: {
                name: 'airship',
                cost: 300,
                value: 1.5,
                number: 0,
                source: 'src/img/2.png',
                queue: 2,
            },

            small_helicopter: {
                name: 'small helicopter',
                cost: 800,
                value: 2,
                number: 0,
                source: 'src/img/3.png',
                queue: 3,
            },

            big_helicopter: {
                name: 'big helicopter',
                cost: 15000,
                value: 2.5,
                number: 0,
                source: 'src/img/4.png',
                queue: 4,
            },

            war_helicopter: {
                name: 'war helicopter',
                cost: 50000,
                value: 3,
                number: 0,
                source: 'src/img/5.png',
                queue: 5,
            },

            basic_airliner: {
                name: 'basic airliner',
                cost: 80000,
                value: 3.5,
                number: 0,
                source: 'src/img/6.png',
                queue: 6,
            },

            second_airliner: {
                name: 'second airliner',
                cost: 115000,
                value: 4,
                number: 0,
                source: 'src/img/7.png',
                queue: 7,
            },

            a380: {
                name: 'a380',
                cost: 540000,
                value: 5,
                number: 0,
                source: 'src/img/8.png',
                queue: 8,
            },

            trump_jet: {
                name: 'trump jet',
                cost: 1600000,
                value: 6,
                number: 0,
                source: 'src/img/9.png',
                queue: 9,
            },

            rocket: {
                name: 'rocket',
                cost: 2000000,
                value: 7,
                number: 0,
                source: 'src/img/10.png',
                queue: 10,
            },

            flying_saucer: {
                name: 'flying saucer',
                cost: 250000,
                value: 8,
                number: 0,
                source: 'src/img/11.png',
                queue: 11,
            },
        },
        partnerships: { //list of partnerships
            mcdonalds: {
                name: 'mcdonalds',
                cost: 1000,
                value: 100,
                duration: 10000,
            },

            volskaya_industries: {
                name: 'volskaya industries',
                cost: 20000,
                value: 200,
                duration: 10000,
            },

            hermès: {
                name: 'hermès',
                cost: 30000,
                value: 300,
                duration: 10000,
            },
            cartier: {
                name: 'cartier',
                cost: 40000,
                value: 400,
                duration: 10000,
            },
            bourienne_consulting: {
                name: 'bourienne consulting',
                cost: 60000,
                value: 600,
                duration: 10000,
            },
        },
        autoclickers: { //list of autoclickers
            business_school_student: {
                name: 'your little sister',
                cost: 15000,
                value: 1,
                number: 0,
            },

            marketing_teacher: {
                name: 'your best friend',
                cost: 150000,
                value: 2,
                number: 0,
            },

            cac40_ceo: {
                name: 'your ex',
                cost: 2000000,
                value: 3,
                number: 0,
            },

            elon_musk: {
                name: 'your boss',
                cost: 30000000,
                value: 4,
                number: 0,
            },

            thomas_edison: {
                name: 'your super boss',
                cost: 400000000,
                value: 5,
                number: 0,
            },

            henry_ford: {
                name: 'Barack Obama',
                cost: 7000000000,
                value: 6,
                number: 0,
            },

            steve_jobs: {
                name: 'Steve Jobs',
                cost: 80000000000,
                value: 8,
                number: 0,
            },

            mr_bourienne: {
                name: 'Elon Musk',
                cost: 1000000000000,
                value: 8,
                number: 0,
            },
        }
    }
    Save();
} else {
    Attribtion();
}

// variable Storage
function Save() {
    var local_data = JSON.stringify(data);
    localStorage.setItem('data', local_data);
};

function Attribtion() {
    data = JSON.parse(localStorage.getItem('data'));
};

/*************************************************
                Fonction - general 
*************************************************/

// update 
function update_dom() {
    game.elements.money.innerText = Math.floor(data.inventory.money) + '£';
    game.elements.valuation.innerText = Math.floor(data.inventory.spent_on_planes + data.inventory.money);
};
update_dom();

// On click ticket
game.elements.ticket.addEventListener('click', function() {
    getion_velocity();
    // money++;
    click_money_incrementation(money);
});

/*************************************************
                 Canvas - nuages 
*************************************************/

// resize canvas
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// vitesse du nuage
var _velocity = 30;
var velocityLoop = setInterval(function() {
    if (_velocity > 6)
        _velocity -= 4;

}, 200);

function getion_velocity() {
    clearInterval(velocityLoop);
    if (_velocity < 80) {
        _velocity += 2;
    }

    velocityLoop = setInterval(function() {
        if (_velocity > 6)
            _velocity -= 4;
    }, 200);
};

// Create tab image
var images = []
addImage = function(src) {
    var img = new Image()
    img.src = src
    images.push(img)
}

addImage('src/img/nuage-1.png')
addImage('src/img/nuage-2.png')

// Choix de l'image produite
var particles = [];

function add_particle() {
    var particle = {};
    particle.x = window.innerWidth;
    particle.y = Math.random(window.innerHeight) * window.innerHeight;
    particle.velocity = {};
    particle.velocity.x = -_velocity * Math.random();

    var index = Math.floor(Math.random() * images.length)
    particle.img = images[index]

    particles.push(particle);
}

function update_particles() {
    for (var i = 0; i < particles.length; i++) {
        var _particle = particles[i];

        _particle.x += _particle.velocity.x;

        if (
            _particle.x < -_particle.img.width ||
            _particle.x > canvas.width ||
            _particle.y < -_particle.img.height ||
            _particle.y > canvas.height
        ) {
            particles.splice(i, 1);
            i--;
        }
    }
}


function draw_particles() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
        var _particle = particles[i];
        if (_particle.velocity.x > -3) {
            context.drawImage(_particle.img, _particle.x, _particle.y, _particle.img.width / 2, _particle.img.height / 2);
        } else {
            context.drawImage(_particle.img, _particle.x, _particle.y, _particle.img.width, _particle.img.height);
        }


    }
}

// Create image with interval
setInterval(function() {
    add_particle();;
}, 250);
//Refresh image
function loop() {
    window.requestAnimationFrame(loop);
    update_particles();
    draw_particles();
}

loop();

/*************************************************
          money incrementation (on click) 
*************************************************/

function click_money_incrementation(money, _values) {
    data.inventory.money += money * data.inventory.multiplier;
    Save();
    Attribtion();
    update_dom();
}

/*************************************************
                variables for buy
*************************************************/

var values_autoclick = 2;

if (values_autoclick > 1) {}
_values = setInterval(function() {

}, 500)

/*************************************************
                    buy planes
*************************************************/

// Init image
function initImg() {
    for (let key in data.planes) {
        if (data.planes.hasOwnProperty(key)) {
            (function() {
                var planes = data.planes[key];
                if (planes.number > 0) {
                    var plane_img = document.querySelectorAll('.plane-img');
                    plane_img[planes.queue - 1].style.opacity = '1';

                };

            })()
        }
    }
};

var imgLoop = setInterval(function() {
    initImg();
}, 400);




var buyPlanes = document.querySelector('.buyPlanes');


for (let key in data.planes) {
    if (data.planes.hasOwnProperty(key)) {
        (function() {
            var plane = data.planes[key];

            // Create var html
            var li = document.createElement('li');
            var cost = document.createElement('span');
            var name = document.createElement('span');
            var qty = document.createElement('span');
            li.classList.add('items');
            name.classList.add('price1');
            qty.classList.add('planes_quantity');

            // application in html
            name.textContent = plane.name + ' - ';
            cost.textContent = plane.cost + ' £';
            qty.textContent = plane.number;
            li.appendChild(name)
            li.appendChild(cost)
            li.appendChild(qty)

            // Au click sur le tableau
            li.addEventListener('click', function() {
                if (plane.cost <= data.inventory.money) {
                    
                    plane.number++;
                    qty.textContent = plane.number;
                    data.inventory.money += -plane.cost;
                    data.inventory.spent_on_planes += plane.cost;
                    data.inventory.multiplier += plane.value;
                    data.planes[key].number++;
                    // create image
                    update_dom();
                    Save();
                }

            })

            buyPlanes.appendChild(li);

        })()
    }
}

/*************************************************
                    buy sponsor
*************************************************/

var buySponsors = document.querySelector('.buySponsors');

for (let key in data.partnerships) {
    if (data.partnerships.hasOwnProperty(key)) {
        (function() {
            var sponsor = data.partnerships[key];

            // Create var html
            var li_sponsors = document.createElement('li');
            li_sponsors.classList.add('items');

            var cost = document.createElement('span');
            var name = document.createElement('span');
            var state = document.createElement('span');
            name.classList.add('price2');

            // application in html
            name.textContent = sponsor.name + ' - ';
            cost.textContent = sponsor.cost + ' £';
            li_sponsors.appendChild(name)
            li_sponsors.appendChild(cost)
            li_sponsors.appendChild(state)

            // Au click sur le tableau
            li_sponsors.addEventListener('click', function() {
                if (sponsor.cost <= data.inventory.money) {
                    data.inventory.money += -sponsor.cost;
                    data.inventory.multiplier += sponsor.value;
                    setTimeout(function() {
                        data.inventory.multiplier -= sponsor.value
                    }, sponsor.duration);
                    update_dom();
                    Save();
                }
            })

            buySponsors.appendChild(li_sponsors);

        })()
    }
}

/*************************************************
                    buy click
*************************************************/

var buyClick = document.querySelector('.buyClick');

for (let key in data.autoclickers) {
    if (data.autoclickers.hasOwnProperty(key)) {
        (function() {
            var autoclickers = data.autoclickers[key];

            // Create var html
            var li_autoclickers = document.createElement('li');
            var name = document.createElement('span');
            var cost = document.createElement('span');
            var qty = document.createElement('span');
            li_autoclickers.classList.add('items');
            name.classList.add('price3');
            qty.classList.add('planes_quantity');

            // application in html
            cost.textContent = autoclickers.cost + ' £';
            name.textContent = autoclickers.name + ' - ';
            qty.textContent = autoclickers.number;
            li_autoclickers.appendChild(name)
            li_autoclickers.appendChild(cost)
            li_autoclickers.appendChild(qty)

            setInterval(function() {
                click_money_incrementation(autoclickers.value * autoclickers.number)
            }, 500)

            // Au click sur le tableau
            li_autoclickers.addEventListener('click', function() {
                if (autoclickers.cost <= data.inventory.money) {
                    autoclickers.number++;
                    qty.textContent = autoclickers.number;
                    data.inventory.money += -autoclickers.cost;
                    // data.inventory.multiplier += autoclickers.value;
                    values_autoclick += autoclickers.value;
                    
                    // autoclickers();
                    data.autoclickers[key].number++;
                    update_dom();
                    Save();
                }
            })
            buyClick.appendChild(li_autoclickers);
        })()
    }
}

/*************************************************
                    affiche items
*************************************************/

// Variables général
game.elements.li = document.querySelectorAll('.items');
game.elements.name_item = document.querySelectorAll('.name_item');
game.elements.value_item = document.querySelectorAll('.value_item');

// Array affiche items
var name_item = ['hot air balloon', 'airship', 'small helicopter', 'big helicopter', 'war helicopter', 'basic airliner', 'second airliner', 'a380', 'trump jet', 'rocket', 'flying saucer', 'mcdonalds', 'volskaya industries', 'hermès', 'cartier', 'bourienne consulting', 'my little sister', 'your best friend', 'your ex', 'your boss', 'your super boss', 'Barack Obama', 'steve jobs', 'Elon Musk'];
var value_item = [1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 100, 200, 300, 400, 600, 1, 2, 3, 4, 5, 6, 8, 8];

// afiche items
for (let i = 0; i < game.elements.li.length; i++) {
    game.elements.li[i].addEventListener('mouseover', function() {
        game.elements.name_item[0].innerHTML = name_item[i];
        game.elements.name_item[1].innerHTML = name_item[i];
        game.elements.name_item[2].innerHTML = name_item[i];
        game.elements.value_item[0].innerHTML = value_item[i];
        game.elements.value_item[1].innerHTML = value_item[i];
        game.elements.value_item[2].innerHTML = value_item[i];

        // algo non abouti 
        // for (let key in data.planes) {
        //         if (data.planes.hasOwnProperty(key)) {
        //             for (let prop in data.planes[key]) {
        //                     if (prop == 'name'){ 
        //                         for (var j = 0; j < game.elements.li.length; j++){
        //                             if (this == game.elements.li[i]){
        //                                 game.elements.name_item[i].innerHTML = game.elements.li[i];
        //                             }
        //                         }
        //                     }
        //                     if (prop == 'value'){ 
        //                         for (var j = 0; j < game.elements.li.length; j++){
        //                             if (this == game.elements.li[i]){
        //                                 game.elements.value_item[i].innerHTML = data.planes[key][prop];
        //                             }
        //                         }
        //                     }


        //                     // this.name.innerHTML = data.planes[key][prop];
        //                     if (key === 'value') this.value_item[i].innerHTML = 'data.planes[key][prop]';


        //                     // game.elements.li[i].addEventListener('mouseout', function() {

        //                         //})
        //             } 
        //         }
        //     }
    })
}



/*****************************************************
            ANIMATION DES ONGLETS INTEGRATION
***********************************************************/

game.elements.tweet.addEventListener('click', function() {
    window.open("https://twitter.com/intent/tweet?hashtags=Airclicker&text=Je%20viens%20de%20faire%20un%20super%20score%20de%20" + game.elements.valuation.innerText + " sur%20le%20airclicker.fr", "", "menubar=no, status=no, width=100px", "height=50");
})

var tabs = document.querySelectorAll('.tab'),
    tabContents = document.querySelectorAll('.tab-content');

for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];

    tab.addEventListener('click', function(event) {
        event.preventDefault();
        for (var i = 0; i < tabContents.length; i++) {
            var tabContent = tabContents[i];
            if (this.dataset.index == i) {
                tabContent.classList.add('active');
            } else {
                tabContent.classList.remove('active');
            }
        }
    })
}





/*************** POP UP TEST *******************/

var click_action = document.querySelector('.clickAction'),
	pop_up = document.querySelector('.popUp');

click_action.addEventListener('click', function(event){
	
	event.preventDefault();
	

	var active_pop = document.querySelector('.popUp');
	
	if (!active_pop.classList.contains('activePop')){
		
		active_pop.classList.add('activePop');
		
	}
		else {
			active_pop.classList.remove('activePop');
		}
})






/************** BILLET ANIMATION ************************/

var click_billet = document.querySelector('.ticket'),
	anim_billet = document.querySelector('.ticketAnim');

click_billet.addEventListener('click', function(event){
	event.preventDefault();
	var active_billet = document.querySelector('.ticketAnim');
	
	if (!active_billet.classList.contains('tick')){
		
		active_billet.classList.add('tick');
		
	}
		else {
			active_billet.classList.remove('tick');
		}
	
})


