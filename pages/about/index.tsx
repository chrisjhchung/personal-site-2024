import type { NextPage } from 'next';
import { Page } from '@/components/Page';
import { Prose } from '@/components/Prose';

const About: NextPage = () => {
  return (
    <>
      <Page title="About" description="I write code. Sometimes it even works.">
        <Prose>
          <p>
            Hey there, I'm Chris! I'll take a guess that since you're here you
            want to learn a bit more about me, so here we go:
          </p>
          <p>
            I’ve got two degrees from UNSW—one in Computer Engineering and the
            other in Biomedical Engineering—because. Think of me as the person
            who couldn't decide between debugging code or debugging life, so I
            chose both.
          </p>
          <p>
            Currently, I’m a Software Engineer at Annalise.ai, where I'm a
            platform engineer. Most of my time is spent Googling and refilling
            on caffeine.
          </p>
          <p>
            I have a thing for human-computer interaction (HCI). It’s like being
            a matchmaker, but for people and their tech—making sure they don’t
            break up over a bad interface.
          </p>
          <p>
            Back in 2019, I co-founded Dashn, an athlete management system. It’s
            being used by professional teams, national teams, and university
            teams. Apparently, combining tech skills with a passion for sports
            pays off. Who knew?
          </p>
          <p>
            Speaking of sports, I played professional football in Hong Kong and
            represented the Hong Kong’s National Youth Teams since 2014. I’ve
            even got a UEFA C coaching certificate, which basically means I can
            yell at players to hustle more—now with an official stamp of
            approval.
          </p>
          <p>
            Whether it's building internal tools, optimizing CI/CD pipelines, or
            cracking a joke to keep things light, I like to think of myself as
            the Swiss Army knife of software engineering. So, if you need
            someone who can code, coach, and keep a sense of humor, I’m your
            person. Just don’t ask me to do all three while holding a cup of
            coffee—I'm not that confident in my multitasking.
          </p>
        </Prose>
      </Page>
    </>
  );
};

export default About;
