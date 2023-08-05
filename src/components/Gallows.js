import gallowsImages0 from "./../assets/0.jpg";
import gallowsImages1 from "./../assets/1.jpg";
import gallowsImages2 from "./../assets/2.jpg";
import gallowsImages3 from "./../assets/3.jpg";
import gallowsImages4 from "./../assets/4.jpg";
import gallowsImages5 from "./../assets/5.jpg";

let gallowsImages = [gallowsImages0, gallowsImages1, gallowsImages2, gallowsImages3, gallowsImages4, gallowsImages5];

function Gallows({tryCount}) {
    return (<img src={gallowsImages[tryCount]}></img>);
}

export default Gallows;