import "./stories.css"

let Stories = () => {
    return(
            <>
                <div className="Container-Stories">
                   <div className="Stories-Outer-Wrapper"> 
                        <div className="Stories-Outer-line">
                            <div className="Stories-Image" style={{backgroundImage:`url(images/${"pic6.jpg"})`,backgroundSize:"cover"}} >
                                <div style={{width:"100%",height:"100%",background:"#0000ff61",borderRadius:"48px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    <span style={{display:"flex",alignItem:"center",justifyContent:"center",fontSize: "38px",color: "white",fontWeight: "200",marginBottom:"9px"}}>+</span>
                                </div>
                            </div>
                        </div>
                        <h2>You</h2>
                    </div>

                   <div className="Stories-Outer-Wrapper"> 
                        <div className="Stories-Outer-line">
                        <div className="Stories-Image" style={{backgroundImage:`url(images/${"mohsin.jpg"})`,backgroundSize:"cover"}} ></div>
                        </div>
                        <h2>Mohsin</h2>
                    </div>

                   <div className="Stories-Outer-Wrapper"> 
                        <div className="Stories-Outer-line">
                        <div className="Stories-Image" style={{backgroundImage:`url(images/${"pic2.jpg"})`,backgroundSize:"cover"}} ></div>
                        </div>
                        <h2>Alsa</h2>
                    </div>

                   <div className="Stories-Outer-Wrapper"> 
                        <div className="Stories-Outer-line">
                        <div className="Stories-Image" style={{backgroundImage:`url(images/${"pic3.jpg"})`,backgroundSize:"cover"}} ></div>
                        </div>
                        <h2>John</h2>
                    </div>
                   <div className="Stories-Outer-Wrapper"> 
                        <div className="Stories-Outer-line">
                        <div className="Stories-Image" style={{backgroundImage:`url(images/${"pic5.jpg"})`,backgroundSize:"cover"}} ></div>
                        </div>
                        <h2>John</h2>
                    </div>
                   <div className="Stories-Outer-Wrapper"> 
                        <div className="Stories-Outer-line">
                        <div className="Stories-Image" style={{backgroundImage:`url(images/${"pic5.jpg"})`,backgroundSize:"cover"}} ></div>
                        </div>
                        <h2>John</h2>
                    </div>
                   <div className="Stories-Outer-Wrapper"> 
                        <div className="Stories-Outer-line">
                        <div className="Stories-Image" style={{backgroundImage:`url(images/${"pic4.jpg"})`,backgroundSize:"cover"}} ></div>
                        </div>
                        <h2>John</h2>
                    </div>

                </div>
                {/* <span className="Line"></span> */}

            </>
    )
}

export default Stories