import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>About</h1>
      </div>
      <p>
        Greetings, fellow humans! I'm the walking paradox who graduated from
        UNSW with a Bachelor's in Computer Engineering and a Master's in
        Biomedical Engineering. Why? Because I couldn't decide if I wanted to
        debug computers or humans. Currently, I'm masquerading as a Software
        Engineer at Annalise.ai, where I've become a full-stack ninja and a
        platform engineering wizard. Don't be fooled by my technical jargon -
        I'm just really good at Googling. In 2019, I co-founded Dashn, an
        athlete management system. Think of it as Facebook for sweaty people.
        We've even got real teams using it! Two professional teams, two national
        teams, and 14 university teams. That's right, we're big in the "people
        who run around in shorts" industry. I'm obsessed with human-computer
        interaction (HCI). It's like dating, but with less awkward silences and
        more coding. My ultimate goal? To combine my biomedical engineering
        background with my tech skills and create the world's first USB-powered
        cyborg soccer player. Speaking of soccer, I've been kicking balls
        professionally in Hong Kong since 2018. Yes, I get paid to play footsie.
        I've even represented Hong Kong's National Youth Teams since 2014.
        Imagine being patriotic and athletic at the same time - it's exhausting!
        Thanks to UNSW's Elite Athlete Program, I managed to juggle (pun
        intended) my studies and my soccer career. I've since obtained my UEFA C
        Certificate for football coaching. Now I can yell at kids to run faster,
        but with a fancy title. In my current role, I've done everything from
        developing internal tools to optimizing CI/CD processes. I'm basically
        the Swiss Army knife of software engineering, minus the bottle opener
        function (still working on that). So, if you need someone who can code,
        kick, and make terrible puns, I'm your person. Just don't ask me to do
        all three at once - I'm talented, not magical.
      </p>
    </div>
  );
};

export default About;
