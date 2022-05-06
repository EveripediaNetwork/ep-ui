import {
  Box,
  Heading,
  Text,
  Flex,
  Divider,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import React from 'react'
import RelatedTopics from '@/components/Elements/RelatedTopics/RelatedTopics'

const Privacy = () => (
  <Box w="min(90%, 1200px)" mx="auto" my={{ base: '10', lg: '16' }}>
    <Heading my={8} as="h1" size="3xl" letterSpacing="wide">
      Privacy Policy
    </Heading>
    <Flex gap={10} flexDirection={{ base: 'column', lg: 'row' }}>
      <Flex gap={5} flex="3" flexDirection="column">
        <Text>
          Everipedia (&quot;Everipedia,&quot; &quot;we&quot; or &quot;us&quot;)
          is committed to protecting your privacy. This Privacy Policy explains
          how information about you or associated with you (&quot;personal
          information&quot;) is collected, used and disclosed by Everipedia Inc.
          and its affiliates (including PredIQt), which own and operate
          Everipedia services (&quot;Everipedia,&quot; &quot;we&quot; or
          &quot;us&quot;). This Policy applies to the online services offered by
          Everipedia at everipedia.org (the &quot;Website&quot; or &quot;Our
          Service&quot;).
        </Text>
        <Heading as="h2" size="md">
          INFORMATION WE COLLECT
        </Heading>
        <Text>
          <b>The categories of information we collect can include:</b>
        </Text>
        <Text>
          <UnorderedList>
            <ListItem>
              <b>Registration.</b> You can browse our site without providing
              personal information, but you must create an account in order to
              access some of the features of our site. When you create an
              account, we may collect personal information, such as your email
              address, user name and password and date of birth. If you take
              part in any interactive features of the Services (such as any
              contests, games, promotions, quizzes, surveys, research or other
              services or features), we may collect additional types of personal
              information. We may also collect information from you if you
              correspond with us directly.
            </ListItem>
            <ListItem>
              <b>Profile Information and User Content.</b> After you set up your
              account, Everipedia members may also chose to provide additional
              information which may be shared through public profiles, such as
              your user name, a picture to represent yourself (which may or may
              not be a photo of you), and a personal narrative. You control how
              much personally identifying information you wish to provide in
              your public profile. We may collect User Content you provide on
              the Website and we may display it publicly on your user Profile.
              For example, your profile page may display information about the
              pages, artists, or works upon which you have commented. Such
              information may include &quot;favorites&quot; such as artists,
              songs and lines. Other users can post to a wall in this profile,
              where the public can view references to your comments you have
              made on the Website. If you chose to connect your social media
              account to your profile, we may also display information from your
              social media sites such as Facebook and Twitter.
            </ListItem>
            <ListItem>
              <b>Information we may receive from social network sites:</b> When
              you interact with our site through various social media, such as
              when you login with or link to your social media account,
              &quot;Like&quot; us on Facebook or share through another social
              media site, we may receive information from the social network
              such as your profile information, profile picture, gender, user
              name, user ID associated with your social media account, age
              range, language, country, friends list, and any other information
              you permit the social network to share with third parties. The
              data we receive is dependent upon your privacy settings with the
              social network. You should always review, and if necessary, adjust
              your privacy settings on third-party websites and services before
              linking or connecting them to our website or Service.
            </ListItem>
          </UnorderedList>
        </Text>
        <Text>
          We use this information to operate, maintain, and provide our features
          and services on the website, populate your profile, and communicate
          with you directly, such as by responding to a request or by providing
          updates on your IQ or pages you have previously commented upon.. You
          can control your receipt of email messages by clicking the
          &quot;unsubscribe&quot; button at the bottom of email communications
          you receive from us. We may also send you Service-related emails
          (e.g., account verification, change or updates to features of the
          Service, or technical and security notices). You may not opt-out of
          Service-related e-mails. For more information about your communication
          preferences, see &quot;Your Choices Regarding Your Information&quot;
          below.
        </Text>
        <Heading as="h2" size="md">
          Information Automatically Collected.
        </Heading>
        <Text>
          We automatically collect certain types of usage information when you
          visit our website or use our Service. When you visit the Service, we
          may send one or more cookies &mdash; a small text file containing a
          string of alphanumeric characters &mdash; to your computer that
          uniquely identifies your browser and lets us help you log in faster
          and enhance your navigation through the site. A cookie may also convey
          information to us about how you use the Service (e.g., the pages you
          view, the links you click and other actions you take on the Service),
          and allow us to track your usage of the Service over time. We may
          collect log file information from your browser or mobile device each
          time you access the Service. Log file information may include
          anonymous information such as your web request, Internet Protocol
          (&quot;IP&quot;) address, browser type, identity of your internet
          service provider, information about your mobile device, referring /
          exit pages and URLs, the number and duration of page views, number of
          clicks and how you interact with links on the Service, domain names,
          landing pages, and other such information. When you access our site
          through a mobile device, we may receive or collect and store a unique
          identification number associated with your device and other device
          information. We may also employ clear gifs (also known as web beacons)
          which are used to anonymously track the online usage patterns of our
          Users. In addition, we may also use clear gifs in HTML-based emails
          sent to our users to track which emails are opened and which links are
          clicked by recipients. The information allows for more accurate
          reporting and improvement of the Service. We may also collect
          analytics data, or use third-party analytics tools, to help us measure
          traffic and usage trends for the Service. These tools collect
          information sent by your browser or mobile device, including the pages
          you visit, your use of third party applications, and other information
          that assists us in analyzing and improving the Service. We use or may
          use the data collected through cookies, log file, device identifiers,
          location data and clear gifs information to: (a) remember information
          so that you will not have to re-enter it during your visit or the next
          time you visit the site; (b) customize your user experience; (c)
          provide and monitor the effectiveness of our Service; (d) monitor
          aggregate metrics such as total number of visitors, traffic, usage,
          and demographic patterns on our website and our Service; (e) diagnose
          or fix technology problems; and (f) otherwise to plan for, improve and
          enhance our service. We may associate information we automatically
          collect with your other information.
        </Text>
        <Heading as="h2" size="md">
          SHARING PERSONAL INFORMATION WITH THIRD PARTIES
        </Heading>
        <Text>
          We may share your personal information in the instances described
          below. For further information on your choices regarding your
          information, see the &quot;Your Choices Regarding Your
          Information&quot; section below. Remember, our Services allow you to
          connect with others and share information about yourself with other
          individuals. Your profile information, including your user name,
          photo, and personal narrative, and comments you make on the Website,
          will be available publicly to other members of the Service by default
          and may be searchable by search engines which may display your
          information publicly. Similarly, your name and photo will be displayed
          alongside any comments you make on the Website and may be displayed on
          our homepage alongside your IQ if you make The Weekly IQ Leaderboard,
          on our Contributors list, or in connection with your comments and
          reactions to our blog and to other contributors. By using the Service,
          you consent to have your profile information displayed publicly.
        </Text>
        <Text>We may also share your personal information with:</Text>
        <Text>
          <UnorderedList>
            <ListItem>
              Other companies owned by or under common ownership as Everipedia,
              Inc., which also includes our subsidiaries (i.e., any organization
              we own or control) or our ultimate holding company (i.e., any
              organization that owns or controls us) and any subsidiaries it
              owns. These companies will use your personal information in the
              same way as we can under this Policy;
            </ListItem>
            <ListItem>
              Third party vendors, consultants and other service providers that
              perform services on our behalf, in order to carry out their work
              for us, which may include providing cloud storage or hosting
              services, marketing assistance, email delivery, content or service
              fulfillment, or providing analytics services. We share personal
              information with these third parties as needed to perform services
              for us and under reasonable confidentiality terms;
            </ListItem>
            <ListItem>
              Our business partners who offer a service to you jointly with us,
              for example, when running a co-sponsored contest or promotion;
            </ListItem>
            <ListItem>
              Third parties who we think may offer you products or services you
              may enjoy. We reserve the right to share your personal
              information, such as email address and user name, with third
              parties for their marketing purposes in the future if we determine
              that there may be additional products or services which may be of
              interest to you. See &quot;Your Choices&quot; below for details on
              how to opt-out of this sharing;
            </ListItem>
            <ListItem>
              Third parties at your request. For example, you may have the
              option to share your activities on our Services with your friends
              through social media;
            </ListItem>
            <ListItem>
              Other parties in connection with any company transaction, such as
              a merger, sale of company assets or shares, reorganization,
              financing, change of control or acquisition of all or a portion of
              our business by another company or third party or in the event of
              bankruptcy or related or similar proceedings; and
            </ListItem>
            <ListItem>
              Third parties as required to (i) satisfy any applicable law,
              regulation, subpoena/court order, legal process or other
              government request, (ii) enforce our Terms of Use Agreement,
              including the investigation of potential violations thereof, (iii)
              investigate and defend ourselves against any third party claims or
              allegations, (iv) protect against harm to the rights, property or
              safety of Everipedia, its users or the public as required or
              permitted by law and (v) detect, prevent or otherwise address
              criminal (including fraud or stalking), security or technical
              issues. We may also share information with others in an aggregated
              and anonymous form that does not reasonably identify you directly
              as an individual.
            </ListItem>
          </UnorderedList>
        </Text>
        <Heading as="h2" size="md">
          YOUR CHOICES REGARDING YOUR INFORMATION
        </Heading>
        <Text>
          <b>Marketing Communications.</b> If you do not want to receive
          promotional emails from us, you can click the &quot;unsubscribe&quot;
          button on promotional email communications. Note that you will not be
          able to unsubscribe or opt-out of non-promotional messages regarding
          your account, such as account verification, password reminders,
          changes or updates to features of the Service, or technical and
          security notices.
        </Text>
        <Text>
          As of August 2015, Everipedia does not share your personal information
          with third parties for advertising purposes, however we reserve the
          right to share your personal information, such as email address and
          user name, with third parties for their marketing purposes in the
          future if we determine that there may be additional products or
          services which may be of interest to you. If you wish to have your
          user name and email address excluded from any such future sharing with
          partners, please email webmaster@everipedia.com with the subject
          &quot;Direct Marketing Opt-Out.&quot; We will not send you an
          individualized notification that this policy is being updated if we
          elect to share information with a partner in this manner, so you must
          opt-out now. If you have any questions about this opt-out or our
          marketing practices, please email us at webmaster@everipedia.com.
        </Text>
        <Text>
          <b>Online Advertising.</b> In the future, we may share certain
          tracking information with online advertising networks so that they may
          display ads that may be relevant to your interests on our Service as
          well as on other websites or apps. Typically, the information we would
          share in this regard is provided through cookies or similar tracking
          technologies. The only way to completely &quot;opt out&quot; of the
          collection of any information through cookies or other tracking
          technology is to actively manage the settings on your browser or
          mobile device. Please refer to your browser&apos;s or mobile
          device&apos;s technical information for instructions on how to delete
          and disable cookies, and other tracking/recording tools. (To learn
          more about behavioral advertising and to learn how to opt-out, you may
          wish to visit{' '}
          <Link href="http://aboutads.info" color="brand.500">
            http://aboutads.info
          </Link>
          ). Depending on your mobile device, you may not be able to control
          tracking technologies through settings.
        </Text>
        <Text>
          <b>Do Not Track.</b> At this time, we do not collect information from
          you for behavioral advertising purposes, though we may collect
          persistent identifiers from your browser or mobile device to assist us
          with providing and improving the Service. Because we collect browsing
          and persistent identifier data only for analytic and internal
          purposes, your selection of the &quot;Do Not Track&quot; option
          provided by your mobile browser will not have any effect on our
          collection of analytics information or the collection of a persistent
          identifier.
        </Text>
        <Text>
          <b>Data Access and Retention:</b> If you wish to change or delete your
          profile and personal information, you may contact us at
          webmaster@everipedia.com and we will amend or delete your personal
          information within a reasonable time after your request. Because of
          the crowd-sourced and collaborative nature of our service, however, we
          will not be able to delete content you post to public areas of our
          site. We may be able to anonymize your information such that you will
          no longer be reasonably identifiable.
        </Text>
        <Heading as="h2" size="md">
          SECURITY AND STORAGE OF INFORMATION
        </Heading>
        <Text>
          Everipedia cares about the security of your information and uses
          commercially reasonable physical, administrative, and technological
          safeguards to preserve the integrity and security of all information
          we collect and that we share with our service providers. Because of
          the nature of our website, WE DO NOT CURRENTLY ENCRYPT ANY
          TRANSMISSIONS TO OR FROM THE WEBSITE IN ANY MANNER. IF YOU ARE
          UNCOMFORTABLE WITH THE UNENCRYPTED TRANSMISSION OF THE PERSONAL
          INFORMATION DESCRIBED HEREIN, PLEASE DO NOT SUBMIT INFORMATION TO US
          THROUGH THE WEBSITE. While we take reasonable precautions against
          possible security breaches, no website or internet transmission is
          completely secure and we cannot guarantee that unauthorized access,
          hacking, data loss or other breach will never occur. In the event that
          any information under our control is compromised as a result of a
          breach of security, we will take reasonable steps to investigate the
          situation and where appropriate, notify those individuals whose
          information may have been compromised and take other steps, in
          accordance with any applicable laws and regulations.
        </Text>
        <Heading as="h2" size="md">
          CHILDREN&apos;S PRIVACY
        </Heading>
        <Text>
          This Website is not intended for children under the age of 13 and we
          do not knowingly collect any personal information from children under
          13. In the event that we learn that we have inadvertently collected
          personal information from children under 13, we will delete or
          anonymize such information. Please contact us at
          webmaster@everipedia.com if you have any questions about
          children&apos;s privacy.
        </Text>
        <Divider />
        <Heading as="h2" size="md">
          COOKIES
        </Heading>
        <Text>
          A browser cookie is a small piece of data that is stored on your
          device to help websites and mobile apps remember things about you.
          Other technologies, including Web storage and identifiers associated
          with your device, may be used for similar purposes. In this policy, we
          say “cookies” to refer to all of these technologies.
        </Text>
        <Heading as="h3" size="sm">
          How We Use Cookies
        </Heading>
        <Text>
          Like most providers of online services, our site uses cookies,
          including third-party cookies, for a number of reasons, like
          protecting your data and account, helping us see which features are
          most popular, counting visitors to a page, improving our users’
          experience, keeping our services secure, providing relevant
          advertising, and just generally providing you with a better, more
          intuitive, and satisfying experience. The cookies we use generally
          fall into one of the following categories.
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Category of cookies</Th>
              <Th>Why we use these cookies</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Necessary</Td>
              <Td>
                We use these cookies to run our site, and to identify and
                prevent security risks. For example, we may use these cookies to
                store your session information to prevent others from changing
                your password without your username and password.
              </Td>
            </Tr>
            <Tr>
              <Td>Preferences</Td>
              <Td>
                We use these cookies to remember your settings and preferences,
                and to improve your experience on our site. For example, we may
                use these cookies to remember your language preferences.
              </Td>
            </Tr>
            <Tr>
              <Td>Performance</Td>
              <Td>
                We use these cookies to collect information about how you use
                our site, monitor site performance, and improve our site
                performance, our services, and your experience. For example, we
                can use these cookies to learn more about which features are the
                most popular with our users and which ones might need some
                tweaks.
              </Td>
            </Tr>
            <Tr>
              <Td>Marketing</Td>
              <Td>
                We use these cookies to deliver advertisements, to make them
                more relevant and meaningful to consumers, and to track the
                efficiency of our advertising campaigns, both on our services
                and on other sites or mobile apps.may use these cookies to build
                a profile of your interests and deliver relevant advertising on
                other sites.
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Heading as="h2" size="md">
          Analytics and Advertising Services
        </Heading>
        <Heading as="h3" size="sm">
          Provided by Others
        </Heading>
        <Text>
          We may let other companies use cookies on our services. These
          companies may collect information about how you use our services over
          time and combine it with similar information from other services and
          companies. This information may be used to, among other things,
          analyze and track data, determine the popularity of certain content,
          and better understand your online activity.
        </Text>
        <Text>
          Additionally, some companies, including our affiliates, may use
          information collected on our services to prevent fraud or other
          unauthorized or illegal activity and to measure and optimize the
          performance of ads and deliver more relevant ads on behalf of us or
          other companies, including on third-party websites and apps.
        </Text>
        <Heading as="h3" size="sm">
          Provided by Us
        </Heading>
        <Text>
          We may collect information about your activity on third-party services
          that use cookies provided by us. We use this information to improve
          our advertising services, including measuring the performance of ads
          and showing you more relevant ads.{' '}
        </Text>
        <Heading as="h3" size="sm">
          LINKS TO THIRD PARTY WEBSITES
        </Heading>
        <Text>
          The Services may, from time to time, contain links to and from third
          party websites of our partner networks, advertisers, partner
          merchants, retailers and affiliates. If you follow a link to any of
          these websites, please note that these websites have their own privacy
          policies and that we do not accept any responsibility or liability for
          their policies. Please check the individual policies before you submit
          any information to those websites.
        </Text>
        <Divider />
        <Heading
          as="h2"
          size="md"
          id="california"
          style={{ scrollMarginTop: '100px' }}
        >
          CALIFORNIA RESIDENTS (California Consumer Privacy Act of 2018)
        </Heading>
        <Text>
          The California Constitution grants a right of privacy. Existing law
          provides for the confidentiality of personal information in various
          contexts and requires a business or person that suffers a breach of
          security of computerized data that includes personal information, as
          defined, to disclose that breach, as specified. California Consumer
          Privacy Act of 2018. Beginning January 1, 2020, the act will grant a
          consumer a right to request a business to disclose the categories and
          specific pieces of personal information that it collects about the
          consumer, the categories of sources from which that information is
          collected, the business purposes for collecting or selling the
          information, and the categories of 3rd parties with which the
          information is shared. The act will require a business to make
          disclosures about the information and the purposes for which it is
          used. The act will grant a consumer the right to request deletion of
          personal information and would require the business to delete upon
          receipt of a verified request, as specified. The act will grant a
          consumer a right to request that a business that sells the
          consumer&rsquo;s personal information, or discloses it for a business
          purpose, disclose the categories of information that it collects and
          categories of information and the identity of 3rd parties to which the
          information was sold or disclosed. The act will require a business to
          provide this information in response to a verifiable consumer request.
          The act will authorize a consumer to opt out of the sale of personal
          information by a business and would prohibit the business from
          discriminating against the consumer for exercising this right,
          including by charging the consumer who opts out a different price or
          providing the consumer a different quality of goods or services,
          except if the difference is reasonably related to value provided by
          the consumer&rsquo;s data. The act will authorize businesses to offer
          financial incentives for collection of personal information. The act
          will prohibit a business from selling the personal information of a
          consumer under 16 years of age, unless affirmatively authorized, as
          specified, to be referred to as the right to opt in. The act will
          prescribe requirements for receiving, processing, and satisfying these
          requests from consumers. The act will prescribe various definitions
          for its purposes and would define &ldquo;personal information&rdquo;
          with reference to a broad list of characteristics and behaviors,
          personal and commercial, as well as inferences drawn from this
          information. The act will prohibit the provisions described above from
          restricting the ability of the business to comply with federal, state,
          or local laws, among other things.
          <br /> Bill text:{' '}
          <Link
            color="brand.500"
            href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB375"
          >
            https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB375
          </Link>
          <br />
          More info:{' '}
          <Link color="brand.500" href="https://www.caprivacy.org/">
            https://www.caprivacy.org/
          </Link>
        </Text>
        <Heading as="h2" size="md">
          UPDATES TO THIS POLICY
        </Heading>
        <Text>
          We reserve the right to modify this Policy from time to time. If we
          make any changes to this Policy, we will change the &quot;Last
          Revision&quot; date below and will post the updated Policy on this
          page.
        </Text>
      </Flex>
      <Box flex="1">
        <RelatedTopics
          topics={[
            { name: 'Terms of Service', url: '/static/terms' },
            { name: 'Guidelines', url: '/static/guidelines' },
          ]}
        />
      </Box>
    </Flex>
  </Box>
)

export default Privacy
