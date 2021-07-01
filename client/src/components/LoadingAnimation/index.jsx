import useStyles from "../../styles/loading_anim";

const LoadingAnimation = () => {
  const classes = useStyles();

  return (
    <div className={classes.loadingAnimationContainer}>
      <img
        src="/assets/images/loading_animation.svg"
        alt="loading Animation"
        className={classes.loadingAnimationIcon}
      />
    </div>
  );
};
export default LoadingAnimation;
