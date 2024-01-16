export class Router {
    routes = {};

    add( routeName, url ) {
        this.routes[routeName] = url;
    };

    route( event ) {
        event = event || window.event
        event.preventDefault();

        window.history.pushState( {}, "", event.target.href );

        this.handle();
    };

    handle() {
        const { pathname } = window.location;
        const route = this.routes[pathname];

        // this.changeActiveLink( route );
        this.changeBackground( route );

        fetch( route )
            .then( data => data.text() )
            .then( html => {
                document.querySelector('.app').innerHTML = html;
            } )
    };

    changeBackground( route ) {
        const pageBackground = route.split("pages/")[1].split(".hmtl")[0];
        const homeLink = document.getElementById('homeLink');
        const homeUniverse = document.getElementById('homeUniverse');
        const homeExploration = document.getElementById('homeExploration');

        switch ( pageBackground ) {
            case "home.html":
                document.body.style.backgroundImage = "url('../assets/mountains-universe-1.png')"
                homeUniverse.classList.remove('active');
                homeExploration.classList.remove('active');
                homeLink.classList.add('active');
                break;
            case "universe.html":
                document.body.style.backgroundImage = "url('../assets/mountains-universe-2.png')"
                homeLink.classList.remove('active');
                homeExploration.classList.remove('active');
                homeUniverse.classList.add('active');
                break;
            case "exploration.html":
                document.body.style.backgroundImage = "url('../assets/mountains-universe-3.png')"
                homeUniverse.classList.remove('active');
                homeLink.classList.remove('active');
                homeExploration.classList.add('active');
                break;
            default:
                document.body.style.backgroundImage = "url('../assets/mountains-universe-1.png')"
                homeUniverse.classList.remove('active');
                homeExploration.classList.remove('active');
                homeLink.classList.add('active');
                break;
        }
    }
}