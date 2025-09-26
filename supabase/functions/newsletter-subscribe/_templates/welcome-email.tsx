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
    <Preview>Welcome to GENIE AI Hub! Your Technology Navigator is here 🧞‍♂️</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={logoSection}>
          <Img
            src={`${siteUrl}/genie-logo-main.png`}
            width="100"
            height="100"
            alt="GENIE Logo"
            style={logo}
          />
          <Heading style={logoText}>GENIE</Heading>
          <Text style={tagline}>I am your Technology Navigator</Text>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Welcome to GENIE AI Hub! 🧞‍♂️</Heading>
          
          <Text style={text}>
            Thank you for joining our innovative community at <strong>GENIE AI Hub</strong>! 
            You've just taken the first step into the future of AI experimentation and discovery.
            As your Technology Navigator, I'm here to guide you through the exciting world of AI innovation.
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

          {/* About Navigator */}
          <Section style={section}>
            <Heading style={h2}>Your Technology Navigator</Heading>
            <Text style={text}>
              GENIE serves as your personal AI Technology Navigator, combining years of industry experience 
              with cutting-edge insights to help you navigate the complex landscape of artificial intelligence. 
              From Cell & Gene Therapeutic Technology to broader AI applications, I'm here to guide your journey 
              toward technological mastery.
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
            Thank you for joining our mission to advance AI innovation!<br/>
            <strong>GENIE - Your Technology Navigator</strong>
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
  backgroundColor: '#f0f7ff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(45, 84, 126, 0.1)',
};

const logoSection = {
  padding: '32px 0',
  textAlign: 'center' as const,
  background: 'linear-gradient(135deg, #2d547e 0%, #48a3c4 50%, #7dd3fc 100%)',
  borderRadius: '12px 12px 0 0',
};

const logo = {
  margin: '0 auto',
  borderRadius: '50%',
  border: '3px solid #7dd3fc',
};

const logoText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '16px 0 8px',
  letterSpacing: '2px',
};

const tagline = {
  color: '#7dd3fc',
  fontSize: '14px',
  fontStyle: 'italic',
  textAlign: 'center' as const,
  margin: '0 0 16px',
  fontWeight: '500',
};

const content = {
  padding: '0 48px',
};

const h1 = {
  color: '#2d547e',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 30px',
  lineHeight: '1.3',
};

const h2 = {
  color: '#2d547e',
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
  backgroundColor: '#48a3c4',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(72, 163, 196, 0.3)',
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
  color: '#48a3c4',
  textDecoration: 'underline',
};