import back from "./videos/back.mp4"

function Back(){
    return(
            <video className="back" loop="loop" autoPlay = "autoplay" muted="muted">
              <source src= {back} type='video/mp4'></source>
           </video>
    );
}

export default Back;