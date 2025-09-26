import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface WelcomeEmailProps {
  subscriberEmail: string;
  unsubscribeUrl: string;
  siteUrl: string;
}

export const WelcomeEmail = ({
  subscriberEmail,
  unsubscribeUrl,
  siteUrl
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Genie AI Experimentation Hub! Discover the future of AI innovation 🧞‍♂️</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={logoSection}>
          <Img
            src={`${siteUrl}/genie-logo.png`}
            width="120"
            height="120"
            alt="Genie AI Logo"
            style={logo}
          />
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Welcome to Genie AI Experimentation Hub! 🧞‍♂️</Heading>
          
          <Text style={text}>
            Thank you for joining our innovative community at <strong>Genie AI Experimentation Hub</strong>! 
            You've just taken the first step into the future of AI experimentation and discovery.
          </Text>

          {/* Mission Section */}
          <Section style={section}>
            <Heading style={h2}>Our Mission</Heading>
            <Text style={text}>
              We're dedicated to democratizing AI experimentation and making advanced artificial intelligence 
              accessible to innovators, researchers, and curious minds worldwide. Our platform serves as your 
              gateway to explore, experiment, and excel with cutting-edge AI technologies.
            </Text>
          </Section>

          {/* Purpose Section */}
          <Section style={section}>
            <Heading style={h2}>What We Do</Heading>
            <Text style={text}>
              • <strong>AI Experimentation Platform:</strong> Hands-on tools for testing and developing AI solutions<br/>
              • <strong>Knowledge Sharing:</strong> Community-driven insights and best practices<br/>
              • <strong>Innovation Hub:</strong> Collaborate with fellow AI enthusiasts and experts<br/>
              • <strong>Learning Resources:</strong> Comprehensive guides and tutorials for all skill levels
            </Text>
          </Section>

          {/* Journey Section */}
          <Section style={section}>
            <Heading style={h2}>Your AI Journey Starts Here</Heading>
            <Text style={text}>
              From curiosity to breakthrough, from concept to implementation - we're here to support 
              your entire AI journey. Whether you're a seasoned developer or just starting out, 
              our hub provides the tools, community, and resources you need to succeed.
            </Text>
          </Section>

          {/* About Founder */}
          <Section style={section}>
            <Heading style={h2}>About Our Founder</Heading>
            <Text style={text}>
              Led by visionary AI researcher and innovator, our hub combines years of industry experience 
              with a passion for making AI accessible to everyone. We believe that the next breakthrough 
              in artificial intelligence could come from anyone, anywhere.
            </Text>
          </Section>

          {/* Call to Action */}
          <Section style={ctaSection}>
            <Button
              href={siteUrl}
              style={button}
            >
              Explore the Hub Now
            </Button>
          </Section>

          <Text style={text}>
            As a subscriber, you'll receive:
          </Text>
          <Text style={text}>
            ✨ Weekly AI experiment insights and tutorials<br/>
            🚀 Early access to new platform features<br/>
            🤝 Invitations to exclusive community events<br/>
            📊 Industry trends and breakthrough discoveries<br/>
            🛠️ Tool recommendations and expert tips
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footer}>
            Thank you for joining our mission to advance AI experimentation!<br/>
            <strong>The Genie AI Experimentation Hub Team</strong>
          </Text>

          <Text style={unsubscribe}>
            You received this email because you subscribed to our newsletter at {subscriberEmail}.<br/>
            <Link href={unsubscribeUrl} style={unsubscribeLink}>
              Unsubscribe from future emails
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logoSection = {
  padding: '32px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const content = {
  padding: '0 48px',
};

const h1 = {
  color: '#1a365d',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 30px',
  lineHeight: '1.3',
};

const h2 = {
  color: '#2d3748',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '32px 0 16px',
};

const text = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const section = {
  margin: '32px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '48px 0',
};

const button = {
  backgroundColor: '#3182ce',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '0 auto',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
};

const footer = {
  color: '#718096',
  fontSize: '14px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '32px 0 16px',
};

const unsubscribe = {
  color: '#a0aec0',
  fontSize: '12px',
  lineHeight: '1.4',
  textAlign: 'center' as const,
  margin: '16px 0 0',
};

const unsubscribeLink = {
  color: '#3182ce',
  textDecoration: 'underline',
};