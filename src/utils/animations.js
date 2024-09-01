function animateWithGsapTimeline(
    gsapTimeLine, rotationRef, rotationState, fromView, toView, gsapAnimation
){
    gsapTimeLine.to( rotationRef.current.rotation,{
            y: rotationState,
            duration: 1,
            ease:'power2.inOut'
        }
    )

    gsapTimeLine.to(
        fromView,
        {
            ...gsapAnimation,
            ease: 'power2.inOut'
        },
        //insert to the start of the previous animation
        '<'
    )

    gsapTimeLine.to(
        toView,
        {
            ...gsapAnimation,
            ease: 'power2.inOut'
        },
        '<'
    )
}

export {
    animateWithGsapTimeline
}