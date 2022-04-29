import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import "./css/Tracker.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Order Placed",
    "Order Confirmed",
    "Order Prepared",
    "Out for delivery",
    "Complete",
  ];
}

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return `For each ad campaign that you create, you can control how much
//               you're willing to spend on clicks and conversions, which networks
//               and geographical locations you want your ads to show on, and more.`;
//     case 1:
//       return "An ad group contains one or more ads which target a shared set of keywords.";
//     case 2:
//       return `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`;
//     default:
//       return "Unknown step";
//   }
// }

export default function VerticalLinearStepper({ orderId }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [orderData, setOrderData] = useState(null);
  let [isIcon, setIcon] = useState(0);
  //   let isIcon = setInterval(() => {
  //     val++;
  //   }, 3000);
  const getOrderData = async () => {
    const data = await axios.get(`/api/order/${orderId}`);
    console.log(data);
    setOrderData(data);
  };

  useEffect(() => {
    getOrderData();
  }, [isIcon]);

  const iconArr = [
    <AssignmentTurnedInIcon />,
    <DoneAllIcon />,
    <FastfoodIcon />,
    <LocalShippingIcon />,
    <EmojiEmotionsIcon />,
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <div className="container">
              <div
                className="container-left"
                style={
                  index === isIcon ? { color: "green" } : { color: "grey" }
                }
              >
                {iconArr[index]}
              </div>
              <div className="container-right">
                <Typography
                  className={index === isIcon ? "label-green" : "label-grey"}
                >
                  {label}
                </Typography>
                <StepContent>
                  {/* <Typography>{getStepContent(index)}</Typography> */}
                  <div className={classes.actionsContainer}>
                    <div>
                      {/* <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button> */}
                    </div>
                  </div>
                </StepContent>
              </div>
            </div>
            {/* {iconArr[index]} */}
            {/* <StepLabel>{label}</StepLabel> */}
            {/* <StepContent> */}
            {/* <Typography>{getStepContent(index)}</Typography> */}
            {/* <div className={classes.actionsContainer}> */}
            {/* <div> */}
            {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button> */}
            {/* </div> */}
            {/* </div> */}
            {/* </StepContent> */}
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}