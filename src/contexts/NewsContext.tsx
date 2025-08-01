import React, { createContext, useContext, useState, useEffect } from 'react';

export interface NewsItem {
  id: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  date: string;
  category: string;
  imageUrl: string;
  isBreaking?: boolean;
  author?: string;
  tags?: string[];
  views?: number;
  likes?: number;
}

interface NewsContextType {
  news: NewsItem[];
  addNews: (newsItem: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, updates: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  getNewsByCategory: (category: string) => NewsItem[];
  getNewsByDate: (date: string) => NewsItem[];
  searchNews: (query: string) => NewsItem[];
  isLoading: boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

// Sample initial news data
const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'BPSC Result 2024 - Important Updates',
    shortDescription: 'Bihar Public Service Commission announces latest result updates for all aspirants.',
    fullContent: `Bihar Public Service Commission (BPSC) has released the much-awaited results for the 2024 recruitment examination. The results have been published on the official website and candidates can check their status using their registration number and date of birth.

    Key Highlights:
    • Total candidates appeared: 2,50,000
    • Total qualified candidates: 15,000
    • Cut-off marks for General category: 85 marks
    • Cut-off marks for SC/ST category: 75 marks
    • Cut-off marks for OBC category: 80 marks

    How to Check Results:
    1. Visit the official BPSC website
    2. Click on the 'Results' section
    3. Enter your registration number
    4. Enter your date of birth
    5. Click 'Submit' to view your result

    Important Instructions:
    • Download and save your result for future reference
    • Qualified candidates should prepare for the next round
    • Document verification will be conducted soon
    • Keep all original documents ready

    The commission has also announced that the next phase of recruitment will begin soon. All qualified candidates are advised to stay updated with the official website for further notifications.`,
    date: '2025-01-31',
    category: 'Exam Results',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'NewsHub Team',
    tags: ['BPSC', 'Result', 'Government Jobs'],
    views: 15420,
    likes: 1240
  },
  {
    id: '2',
    title: 'IIT JEE Main 2025 Registration Extended',
    shortDescription: 'National Testing Agency extends the last date for JEE Main 2025 application.',
    fullContent: `The National Testing Agency (NTA) has extended the registration deadline for JEE Main 2025 examination. The new deadline has been set to provide more time for students to complete their applications.

    Updated Timeline:
    • Last date for registration: February 15, 2025
    • Last date for fee payment: February 16, 2025
    • Correction window: February 18-20, 2025
    • Admit card release: March 1, 2025
    • Examination dates: April 2025 (to be announced)

    Important Changes:
    • Application fee remains unchanged
    • New exam centers added in remote areas
    • Enhanced security measures implemented
    • Mobile app for result checking

    This extension comes as a relief to thousands of students who were facing difficulties in completing their applications due to various technical issues and document verification problems.

    Students are advised to complete their applications well before the deadline to avoid last-minute rush. All required documents should be kept ready in the prescribed format.`,
    date: '2025-01-30',
    category: 'Admissions',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Education Desk',
    tags: ['JEE', 'Admissions', 'Engineering'],
    views: 8930,
    likes: 670
  },
  {
    id: '3',
    title: 'New Education Policy Updates 2025',
    shortDescription: 'Government announces major updates to the National Education Policy.',
    fullContent: `The Government of India has announced significant updates to the National Education Policy (NEP) 2025, marking a revolutionary change in the Indian education system.

    Key Updates:
    • Introduction of coding from Class 6
    • Mandatory environmental studies
    • Enhanced focus on practical learning
    • Digital infrastructure development
    • Teacher training programs

    Implementation Timeline:
    • Phase 1: June 2025 - Primary schools
    • Phase 2: September 2025 - Secondary schools
    • Phase 3: January 2026 - Higher education

    The policy aims to prepare students for the challenges of the 21st century by incorporating modern teaching methodologies and technological advancements.

    Educational institutions across the country are preparing for the implementation of these new guidelines. The government has allocated additional funds for infrastructure development and teacher training programs.`,
    date: '2025-01-29',
    category: 'Policy',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Policy Correspondent',
    tags: ['Education Policy', 'NEP 2025', 'Government'],
    views: 12340,
    likes: 890
  },
  {
    id: '4',
    title: 'Election Commission Initiates Process for Vice-Presidential Poll',
    shortDescription: 'The Election Commission of India (ECI) has commenced the preparatory process for conducting the election to the office of the Vice-President of India.',
    fullContent: `The Election Commission of India announced that it has initiated the constitution of the electoral college for the upcoming vice-presidential election. This development signals the start of a crucial constitutional process to elect the nation's second-highest officeholder. The poll panel is also in the process of finalising the Returning Officers who will oversee the election.

    The election of the Vice-President is governed by Article 66 of the Indian Constitution. The electoral college for this election is distinct from that of the presidential election; it comprises all members of both the Lok Sabha and the Rajya Sabha, including nominated members. Members of state legislative assemblies are not part of this electoral college. The election is held in accordance with the system of proportional representation by means of the single transferable vote, and the voting is conducted by secret ballot.

    This procedural announcement gained additional political significance due to comments from Opposition leader Mallikarjun Kharge, who raised questions about the circumstances surrounding the resignation of the incumbent Vice-President, Jagdeep Dhankhar, suggesting "daal mein kuch kaala hai" (something is amiss). This context transforms a routine constitutional procedure into a politically charged event, potentially influencing the selection of candidates and the ensuing political discourse. The process underscores the ECI's role in ensuring the continuity of India's democratic institutions, even amidst a contentious political atmosphere.`,
    date: '2025-07-23',
    category: 'Politics',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Political Correspondent',
    tags: ['Election Commission', 'Vice President', 'Politics'],
    views: 18500,
    likes: 1450
  },
  {
    id: '5',
    title: 'Parliament Deadlocked Over Bihar\'s Special Intensive Revision (SIR) of Electoral Rolls',
    shortDescription: 'The Monsoon Session of Parliament was repeatedly stalled as Opposition parties protested the Special Intensive Revision (SIR) of electoral rolls in Bihar.',
    fullContent: `Proceedings in both the Lok Sabha and Rajya Sabha were brought to a standstill for three consecutive days during the Monsoon Session. The deadlock was caused by sustained protests from Opposition parties under the INDIA bloc banner, who were demanding a comprehensive discussion on the Special Intensive Revision (SIR) of electoral rolls initiated by the Election Commission in Bihar. A delegation of 11 parties from the bloc also met with the ECI to formally register their objections.

    The SIR process requires voters to provide documents to prove their citizenship. For individuals born after July 1, 1987, it mandates the submission of proof of their parents' date and place of birth. The Opposition has vehemently opposed this, labelling it a "backdoor NRC" (National Register of Citizens) and an "exercise of exclusion" that could lead to the mass disenfranchisement of poor and marginalized communities who may lack the necessary legacy documentation. The ECI's data from the first phase, suggesting a potential exclusion of 66 lakh people on grounds of being "deceased, permanently shifted or untraceable," has further fueled these concerns.

    The Election Commission has defended the exercise, stating it is a standard procedure to ensure the accuracy of the voter list and has provided a one-month window (August 1 to September 1) for claims and objections. However, the controversy highlights a significant conflict between the goals of electoral integrity and the protection of civil liberties, reflecting deep-seated national anxieties about citizenship following the NRC and Citizenship Amendment Act (CAA) debates.`,
    date: '2025-07-24',
    category: 'Politics',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Parliamentary Reporter',
    tags: ['Parliament', 'Bihar', 'Electoral Rolls', 'Opposition'],
    views: 12800,
    likes: 890
  },
  {
    id: '6',
    title: 'Government Approves Constitution of Eighth Central Pay Commission',
    shortDescription: 'The Union Cabinet approved the formation of the Eighth Central Pay Commission to recommend revisions to the salary and pension structure for central government employees.',
    fullContent: `The Union Cabinet has given its approval for the constitution of the Eighth Central Pay Commission. This move comes as the recommendations of the Seventh Pay Commission are set to conclude in 2026. The formation of the new commission was also highlighted in the President's address to Parliament, underscoring its importance as a major policy decision.

    Pay Commissions in India are quasi-judicial bodies established approximately every ten years. Their primary mandate is to review and recommend changes to the salary structures, allowances, pensions, and other benefits for all central government employees, which includes civilian staff as well as personnel in the armed forces. These recommendations have a wide-ranging impact on the national economy, influencing the finances of state governments, which often adopt similar pay structures for their employees.

    The early constitution of the Eighth Pay Commission is a significant fiscal and political decision. Economically, the implementation of its recommendations is expected to lead to a substantial increase in the disposable income of a large segment of the population, thereby stimulating consumption and aggregate demand. Politically, the announcement serves to build goodwill with a large and influential constituency of current and retired government employees. However, this action also commits the government to a significant future financial liability, which will have a considerable impact on the fiscal deficit and the national budget in the coming years.`,
    date: '2025-01-15',
    category: 'Policy',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Economic Correspondent',
    tags: ['Pay Commission', 'Government Employees', 'Salary'],
    views: 16200,
    likes: 1120
  },
  {
    id: '7',
    title: 'PM Internship Scheme 2025 Launched to Boost Youth Employability',
    shortDescription: 'The government has launched the PM Internship Scheme 2025, a one-year program offering a monthly stipend to young graduates and students.',
    fullContent: `The PM Internship Scheme 2025 has been introduced as a key initiative to enhance the employability of India's youth. The program is open to students and graduates between the ages of 21 and 24 who are not currently in full-time education or employment. The internship has a duration of one year, during which participants receive a monthly stipend of ₹5,000. This stipend is co-funded, with ₹4,500 disbursed by the government directly into the intern's Aadhaar-linked bank account through Direct Benefit Transfer (DBT), and the remaining ₹500 paid by the participating company.

    The application process is managed through an official portal, pminternship.mca.gov.in. The scheme has attracted participation from top companies across various sectors, including Reliance Industries, Tata Consultancy Services (TCS), and Hindustan Unilever, in fields such as IT, healthcare, consulting, and manufacturing. However, the scheme has faced significant implementation challenges. Despite receiving over 6.21 lakh applications and 82,000 offers being made, only 8,700 candidates ultimately joined the program, marking a joining rate of just 6%.

    This low uptake reveals a potential disconnect between the policy's design and the practical realities faced by young job-seekers. The modest stipend may be insufficient for interns in major urban centers, and there may be a mismatch between the quality of internships offered and the aspirations of the candidates.`,
    date: '2025-07-15',
    category: 'Employment',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Employment Desk',
    tags: ['PM Internship', 'Youth Employment', 'Government Scheme'],
    views: 14500,
    likes: 980
  },
  {
    id: '8',
    title: 'Defence Acquisition Council Greenlights ₹1.05 Lakh Crore Indigenous Military Procurement',
    shortDescription: 'The Defence Acquisition Council (DAC) approved military procurement proposals worth approximately ₹1.05 lakh crore, with emphasis on indigenous manufacturing.',
    fullContent: `In a major push for India's defence self-reliance, the Defence Acquisition Council (DAC), chaired by Defence Minister Rajnath Singh, granted Acceptance of Necessity (AoN) for ten capital acquisition proposals valued at around ₹1.05 lakh crore ($12.5 billion). A crucial aspect of this approval is that all procurement will be sourced from Indian manufacturers under the 'Buy (Indian-IDDM)' category. This category mandates that the equipment must be Indigenously Designed, Developed, and Manufactured with at least 50% indigenous content, reinforcing the 'Atmanirbhar Bharat' initiative.

    The approved list includes critical capabilities for all three services:

    For the Army: Armoured Recovery Vehicles, a state-of-the-art Electronic Warfare System, and three regiments of Quick Reaction Surface-to-Air Missiles (QRSAMs) with a range of 30 km.

    For the Navy: 12 Mine Counter Measure Vessels (MCMVs) to safeguard maritime zones, Super Rapid Gun Mounts for warships, Moored Mines, and Submersible Autonomous Vessels.

    For the Tri-Services: An Integrated Common Inventory Management System to enhance logistical efficiency and supply chain management.

    This procurement drive represents a strategic shift in India's defence policy. It aims to reduce dependency on foreign military hardware, thereby enhancing the nation's strategic autonomy, and simultaneously build a robust domestic defence industrial base.`,
    date: '2025-07-03',
    category: 'Defence',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Defence Correspondent',
    tags: ['Defence', 'Indigenous Manufacturing', 'Military Procurement'],
    views: 19800,
    likes: 1650
  },
  {
    id: '9',
    title: 'Supreme Court Prohibits Ex-Post Facto Environmental Clearances',
    shortDescription: 'The Supreme Court delivered a landmark judgment prohibiting the practice of granting environmental clearances to projects retrospectively.',
    fullContent: `In a significant ruling that strengthens environmental jurisprudence in India, the Supreme Court has definitively struck down the practice of granting ex-post facto (retrospective) Environmental Clearances (EC). The judgment explicitly prohibits the regularization of projects that have commenced operations without obtaining prior EC as mandated by the Environment (Protection) Act, 1986. Furthermore, the Court took the extraordinary step of restraining the Central Government from introducing any future legislative instruments that would permit such regularization.

    This decision reinforces the "precautionary principle," which is a cornerstone of environmental law, asserting that environmental protection measures must be taken before any potential harm occurs. The ruling effectively invalidates the 'pollute and pay' approach for violations of prior clearance norms, establishing that compliance cannot be treated as a mere formality to be completed after a project has already caused environmental impact.

    The judgment is set to have far-reaching consequences for industries, particularly in the mining, infrastructure, and manufacturing sectors, where projects have often commenced without full clearance. It fundamentally alters the compliance landscape by creating significant legal and financial risks for developers, thereby strengthening the position of environmental regulators and activists.`,
    date: '2025-05-20',
    category: 'Environment',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Legal Correspondent',
    tags: ['Supreme Court', 'Environment', 'Legal Ruling'],
    views: 16750,
    likes: 1340
  },
  {
    id: '10',
    title: 'PM Modi\'s Visit to UK and Maldives Strengthens Strategic Ties',
    shortDescription: 'Prime Minister Narendra Modi\'s two-nation tour to the United Kingdom and the Maldives resulted in the strengthening of key strategic partnerships.',
    fullContent: `Prime Minister Narendra Modi embarked on a significant four-day visit to the United Kingdom and the Maldives, showcasing India's multi-faceted diplomatic engagement.

    In the United Kingdom (July 23-24), PM Modi held discussions with the newly elected Prime Minister Keir Starmer. The visit was pivotal as it marked the successful conclusion of the long-negotiated India-UK Free Trade Agreement (FTA) and a Double Taxation Avoidance Convention. The talks aimed to build on the existing Comprehensive Strategic Partnership, deepening cooperation in trade, defence, technology, and climate action under the India-UK Roadmap 2030 framework.

    Following the UK leg, PM Modi traveled to the Maldives (July 25-26) as the Guest of Honour for the nation's 60th anniversary of independence. This visit was crucial for resetting bilateral ties, which had been strained following President Mohamed Muizzu's initial "India Out" campaign. The visit saw the inauguration of several India-funded infrastructure projects, including a new Ministry of Defence building and social housing units. Key agreements were signed covering debt repayment restructuring, which reduced the Maldives' annual burden by 40%, along with a new $565 million credit line and enhanced cooperation in fisheries and health.`,
    date: '2025-07-26',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Foreign Affairs Desk',
    tags: ['PM Modi', 'UK', 'Maldives', 'Diplomacy'],
    views: 21500,
    likes: 1890
  },
  {
    id: '11',
    title: 'RBI Cuts Repo Rate by 50 Bps and Shifts Stance to \'Neutral\'',
    shortDescription: 'The Reserve Bank of India\'s Monetary Policy Committee announced a deeper-than-expected 50 basis point cut in the repo rate to 5.50%.',
    fullContent: `In its bi-monthly policy review, the RBI's Monetary Policy Committee delivered a significant stimulus to the economy by cutting the policy repo rate by 50 basis points (bps), from 6.00% to 5.50%. This "jumbo" rate cut was more aggressive than the market consensus, which had anticipated a 25 bps reduction. This move marked the third rate cut in 2025, bringing the cumulative reduction since February to 100 bps.

    The primary driver for this front-loaded action was the RBI's increased comfort with the inflation trajectory, with the CPI inflation forecast for FY26 being revised downwards from 4.0% to 3.70%. This provided the necessary space for the central bank to focus on boosting economic growth amidst a challenging global environment and slowing domestic indicators like credit growth.

    Simultaneously, the MPC decided to change its monetary policy stance from "accommodative" to "neutral." This is a sophisticated policy signal indicating that while the RBI has provided a substantial immediate boost, it is now adopting a more cautious, data-dependent approach for the future. Governor Sanjay Malhotra clarified that the neutral stance provides flexibility to move in either direction—up, down, or pause—based on incoming data on inflation and growth.`,
    date: '2025-06-06',
    category: 'Economics',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Economic Affairs Desk',
    tags: ['RBI', 'Repo Rate', 'Monetary Policy'],
    views: 23400,
    likes: 2100
  },
  {
    id: '12',
    title: 'Healthcare Sector Leads M&A Deals in H1 2025',
    shortDescription: 'The healthcare sector was a key driver of M&A activity in India during the first half of 2025, highlighted by the largest deal of the period.',
    fullContent: `The healthcare and pharmaceutical sectors were at the forefront of India's M&A activity in the first half of 2025, contributing significantly to the deal volume and value. This trend underscores the growing investor interest in India's healthcare industry, particularly in tech-enabled services and outsourcing.

    The largest single transaction of H1 2025 came from this sector: the acquisition of Chennai-based revenue cycle management firm Access Healthcare Services by the US-based private equity firm New Mountain Capital for $2 billion. This deal highlights the strong global demand for India's healthcare BPO (Business Process Outsourcing) services, which combine a skilled workforce with technological capabilities.

    Another significant deal in the broader life sciences space is the ongoing discussion for Torrent Group to acquire JB Chemicals & Pharmaceuticals from the global private equity major KKR, in a transaction pegged at around $3 billion. The consistent high-value deal flow in this sector reflects its resilience and strong growth prospects, driven by both domestic demand and global outsourcing trends.`,
    date: '2025-06-30',
    category: 'Business',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Business Correspondent',
    tags: ['Healthcare', 'M&A', 'Investment'],
    views: 13200,
    likes: 940
  },
  {
    id: '13',
    title: 'Overview of Major Government Schemes for 2025-26',
    shortDescription: 'The government outlined its key social welfare and development schemes for the 2025-26 fiscal year, focusing on targeted support for marginalized communities.',
    fullContent: `The government has announced its portfolio of flagship schemes for the fiscal year 2025-26, emphasizing a targeted approach to social welfare and empowerment. These schemes, primarily under the Ministry of Social Justice and Empowerment, aim to provide specific benefits to designated groups.

    Key schemes include:

    SHRESHTA (Scheme for Residential Education for Students in High Schools in Targeted Areas): This scheme focuses on providing high-quality residential education to meritorious students from the Scheduled Castes (SC) community.

    Atal Vayo Abhyuday Yojana (AVYAY): This is an umbrella scheme dedicated to the welfare of senior citizens, integrating various programs for their financial security, healthcare, and social engagement.

    PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojna): This is a consolidated scheme merging three existing schemes for SC communities, aimed at reducing poverty through income-generating projects and skill development.

    SMILE (Support for Marginalized Individuals for Livelihood and Enterprise): This scheme focuses on the welfare and rehabilitation of the transgender community and individuals engaged in begging.

    PM-YASASVI (PM Young Achievers Scholarship Award Scheme for Vibrant India): This scholarship scheme is targeted towards students from Other Backward Classes (OBC), Economically Backward Classes (EBC), and De-notified, Nomadic & Semi-Nomadic Tribes (DNT).

    The design of these schemes indicates a strategic shift in India's welfare architecture. The focus is on specific, mission-mode interventions for clearly defined demographic groups, moving away from broader, universal programs.`,
    date: '2025-01-15',
    category: 'Policy',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Social Welfare Correspondent',
    tags: ['Government Schemes', 'Social Welfare', 'Policy'],
    views: 11200,
    likes: 780
  },
  {
    id: '14',
    title: 'India Aims to Drastically Reduce Arms Procurement Timelines',
    shortDescription: 'A high-level Ministry of Defence committee is reviewing the Defence Acquisition Procedure (DAP) 2020 to cut procurement timelines from eight years to under two years.',
    fullContent: `The Ministry of Defence has initiated a comprehensive review of its arms procurement procedures with the ambitious goal of reducing the acquisition timeline from the current average of seven to eight years to less than two years. A top-level committee, headed by the Director General (Acquisition), is spearheading this review of the Defence Acquisition Procedure (DAP) 2020, with a final report expected by December 2025.

    The review has identified three primary bottlenecks that contribute to the protracted timelines: the preparation of the Request for Proposal (RFP), lengthy field evaluation trials, and complex contract negotiations. To address these, the committee is considering several innovative measures. These include the use of simulation-based trials to substitute some physical field evaluations and potentially skipping redundant trials for weapon systems that are already in active service with trusted foreign militaries.

    This reform is a critical operational complement to the government's 'Atmanirbhar Bharat' initiative. It acknowledges that self-reliance in defence is ineffective if the procured technology is obsolete by the time it is inducted. By streamlining procedures, the government aims to ensure that the Indian armed forces are equipped not just with domestically produced hardware, but with cutting-edge systems that are relevant to contemporary security challenges.`,
    date: '2025-07-18',
    category: 'Defence',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Defence Policy Analyst',
    tags: ['Defence Procurement', 'Military Modernization', 'Policy Reform'],
    views: 15600,
    likes: 1120
  },
  {
    id: '15',
    title: 'Supreme Court on Speaker\'s Powers in Anti-Defection Law',
    shortDescription: 'The Supreme Court urged Parliament to reconsider the Speaker\'s role as the adjudicating authority in anti-defection cases and set a time limit for decisions.',
    fullContent: `The Supreme Court has made a significant observation regarding the functioning of the anti-defection law, as laid out in the Tenth Schedule of the Constitution. In a ruling in late July 2025, the Court urged Parliament to revisit the provisions that grant the Speaker of a legislature the sole authority to decide on disqualification petitions against defecting members. This suggestion stems from growing concerns over the perceived partiality and inordinate delays by Speakers in adjudicating such cases, which often benefits the ruling party and undermines the law's intent.

    In a related and concurrent judgment, the Court demonstrated its impatience with such delays by directing the Speaker of the Telangana Assembly to conclude disqualification proceedings against several BRS MLAs who had defected to the ruling INC party within a strict three-month timeframe. The Court asserted that the Speaker does not possess absolute constitutional immunity from judicial review in these matters, particularly when there is undue delay.

    These developments signal the judiciary's push for a major constitutional reform. The Court's suggestion to potentially replace the Speaker with an independent tribunal or another neutral mechanism for deciding defection cases aims to insulate the process from political influence. This move seeks to restore the integrity of the anti-defection law and strengthen democratic accountability by ensuring that decisions are made impartially and expeditiously.`,
    date: '2025-07-30',
    category: 'Politics',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Constitutional Law Expert',
    tags: ['Supreme Court', 'Anti-Defection', 'Constitutional Law'],
    views: 18900,
    likes: 1456
  },
  {
    id: '16',
    title: 'Supreme Court Affirms Right to Privacy for Adolescents',
    shortDescription: 'In a significant ruling, the Supreme Court of India delivered a judgment that specifically addressed and affirmed the right to privacy for adolescents.',
    fullContent: `Building on its historic 2017 K.S. Puttaswamy judgment, which established the Right to Privacy as a fundamental right under Article 21 of the Constitution, the Supreme Court has further refined its application to specific demographics. In a judgment delivered on May 23, 2025, the Court explicitly recognized and detailed the contours of the right to privacy as it pertains to adolescents.

    This ruling is a crucial development in the context of the digital age, where young people are increasingly exposed to unique privacy risks. The judgment grapples with the complex interplay between parental authority, the state's duty to protect minors, and the evolving autonomy of adolescents. While the full text of the judgment details the specific legal reasoning, its pronouncement signifies that the Court is adapting fundamental rights to contemporary social and technological realities.

    The decision is expected to have wide-ranging implications. It will likely influence the formulation of the Draft Digital Personal Data Protection Rules, 2025, particularly concerning data collection and consent mechanisms for minors. Furthermore, it sets a legal precedent that could impact family law, the responsibilities of educational institutions, and the terms of service for technology companies that cater to young users.`,
    date: '2025-05-23',
    category: 'Legal',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Digital Rights Correspondent',
    tags: ['Privacy Rights', 'Adolescents', 'Supreme Court'],
    views: 14750,
    likes: 1089
  },
  {
    id: '17',
    title: 'US Imposes 25% Tariff on Indian Exports, Citing Russia Ties',
    shortDescription: 'The United States announced a 25% tariff on Indian exports, linking the trade measure directly to India\'s strategic and economic relationship with Russia.',
    fullContent: `The US administration under President Donald Trump imposed a significant 25% tariff on a range of Indian exports, which came into effect on August 1, 2025. The official justification cited India's high duties on American goods and non-monetary trade barriers. However, President Trump explicitly stated that the tariff also serves as an "additional penalty" for India's deepening strategic ties with Russia, particularly its large-scale purchases of Russian crude oil and military hardware.

    This development places India in a challenging geopolitical position, testing its long-held policy of "strategic autonomy." The India-Russia relationship has remained robust, with bilateral trade soaring to $68.7 billion in FY25, largely driven by energy imports. Russia now accounts for approximately 40% of India's total oil imports, a dramatic increase from pre-Ukraine war levels. Furthermore, India remains the world's largest importer of Russian arms, with over 50% of its military equipment being of Russian origin.

    The US tariff action is a form of secondary sanction, using economic leverage to influence a third country's foreign policy. It forces New Delhi into a difficult balancing act between maintaining its time-tested, strategic partnership with Moscow and managing its critical economic and security relationship with Washington.`,
    date: '2025-08-01',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Trade Policy Analyst',
    tags: ['US-India Relations', 'Trade War', 'Russia Sanctions'],
    views: 22100,
    likes: 1780
  },
  {
    id: '18',
    title: 'India and Pakistan Engage in \'Four-Day Conflict\' in May 2025',
    shortDescription: 'A terrorist attack in April led to a four-day military conflict between India and Pakistan, involving cross-border strikes and the first-time use of cruise missiles by India.',
    fullContent: `Following a major terrorist attack in Pahalgam in April 2025, tensions between India and Pakistan escalated into the most serious military conflict in decades, lasting from May 7 to May 10, 2025. India initiated the conflict with a series of punitive strikes, codenamed 'Operation Sindoor', targeting terror infrastructure inside Pakistan and Pakistan-occupied Kashmir.

    This conflict marked a significant escalation in military tactics. For the first time, India employed standoff cruise missiles, including the co-developed Indo-Russian BrahMos missile and the European SCALP-EG missile, to conduct precise attacks deep inside Pakistani territory. The four days saw a series of actions and reactions, including Pakistani counter-air operations that reportedly led to the loss of some Indian aircraft (a claim denied by New Delhi), drone attacks by Pakistan, and limited short-range ballistic missile launches, which were largely countered by India's integrated air and missile defence systems.

    The United States played a crucial diplomatic role in de-escalating the crisis and brokering a ceasefire on May 10. US President Donald Trump later claimed that his intervention had stopped what was "probably going to end up in a nuclear war". The conflict established a new, higher threshold for conventional warfare between the two nuclear-armed states.`,
    date: '2025-05-10',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Security Affairs Correspondent',
    tags: ['India-Pakistan Conflict', 'Military Operations', 'National Security'],
    views: 35600,
    likes: 2890
  },
  {
    id: '19',
    title: 'India Deepens Diplomatic Engagements Across Asia and Africa',
    shortDescription: 'India conducted a series of high-level diplomatic and defence engagements across Asia and Africa, reinforcing its "multi-vector" foreign policy.',
    fullContent: `During the period of May to July 2025, India pursued an intensive diplomatic outreach, demonstrating its strategy of engaging multiple partners across different regions. This multi-vector approach aimed to strengthen bilateral ties and advance India's strategic interests.

    Key engagements included:

    Indo-Pacific and Neighbourhood: India held the 6th Foreign Office Consultations with Fiji, a bilateral dialogue between its Foreign Secretary and Japan's Vice-Minister for Foreign Affairs in New Delhi, and the 7th meeting of the India-Nepal Boundary Working Group to address border issues. Defence Minister Rajnath Singh also met his Japanese counterpart, Gen Nakatani, to discuss Indo-Pacific stability.

    Russia and Southeast Asia: Raksha Rajya Mantri Sanjay Seth visited Russia for its Victory Day celebrations, meeting President Putin to reaffirm military ties. He also attended the LIMA 2025 exhibition in Malaysia, showcasing indigenous defence platforms like the BrahMos missile and Dornier aircraft.

    Africa: Prime Minister Modi's visit to Ghana in July was the first by an Indian Prime Minister in over three decades. The visit focused on reviving economic ties, with a target to double bilateral trade to $6 billion, and enhancing security cooperation to counter threats in the Sahel and coastal piracy.`,
    date: '2025-07-15',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Diplomatic Correspondent',
    tags: ['Diplomacy', 'Multi-alignment', 'Foreign Policy'],
    views: 16400,
    likes: 1245
  },
  {
    id: '20',
    title: 'India\'s Strong Stance on Terrorism at the UN Security Council',
    shortDescription: 'At a UN Security Council meeting, India strongly condemned nations that foment cross-border terrorism, making a thinly veiled reference to Pakistan.',
    fullContent: `During a United Nations Security Council (UNSC) meeting presided over by Pakistan, India delivered a powerful statement calling for "zero tolerance for terrorism." India's Permanent Representative to the U.N., Ambassador Parvathaneni Harish, asserted that there should be a "serious cost" for nations that support and foment cross-border terrorism.

    Without directly naming Pakistan, the statement described the neighboring country as being "steeped in fanaticism" and a "serial borrower." The remarks were a direct response to the theme of the meeting, "promoting international peace and security," and aimed to highlight the role of state-sponsored terrorism as a primary obstacle to achieving this goal.

    This intervention at the UNSC is a continuation of India's long-standing diplomatic campaign to isolate Pakistan on the international stage over the issue of terrorism. It reinforces India's position that there can be no distinction between "good" and "bad" terrorists and that the international community must hold accountable those states that use terrorism as an instrument of state policy. The statement underscores the deep-seated trust deficit and ongoing tensions between the two South Asian neighbors.`,
    date: '2025-07-23',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'UN Correspondent',
    tags: ['UN Security Council', 'Terrorism', 'India-Pakistan Relations'],
    views: 19200,
    likes: 1567
  },
  {
    id: '21',
    title: 'India and UAE Reaffirm Commitment to Deepen Strategic Partnership',
    shortDescription: 'Prime Minister Narendra Modi and UAE President His Highness Mohammed bin Zayed held discussions reaffirming their commitment to enhancing the India-UAE Comprehensive Strategic Partnership.',
    fullContent: `In a high-level engagement, Prime Minister Narendra Modi and UAE President His Highness Mohammed bin Zayed reaffirmed the strong bilateral ties between the two nations and their shared commitment to deepening the India-UAE Comprehensive Strategic Partnership. The discussion, announced by the Ministry of External Affairs, focused on building upon the significant progress made in recent years across various sectors.

    The India-UAE relationship has transformed into a multi-faceted partnership encompassing trade, investment, energy security, food security, and defence cooperation. The Comprehensive Economic Partnership Agreement (CEPA), which came into effect in 2022, has been a key driver of economic engagement, significantly boosting bilateral trade.

    This reaffirmation of the strategic partnership is significant as it signals the continued importance both countries place on their relationship amidst a changing global geopolitical landscape. For India, the UAE is a crucial partner in the Gulf region, a major source of energy and investment, and a gateway to markets in the Middle East and Africa. For the UAE, India is a vital economic partner and a key player in ensuring regional stability.`,
    date: '2025-07-31',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Gulf Correspondent',
    tags: ['India-UAE Relations', 'Strategic Partnership', 'Economic Cooperation'],
    views: 12800,
    likes: 945
  },
  {
    id: '22',
    title: 'State Visit of Philippines President to India Announced',
    shortDescription: 'The Ministry of External Affairs announced that the President of the Republic of the Philippines, H.E. Ferdinand R. Marcos Jr., will undertake a state visit to India in August 2025.',
    fullContent: `The Indian Ministry of External Affairs officially announced that Ferdinand R. Marcos Jr., the President of the Philippines, will be on a state visit to India from August 4 to August 8, 2025. This upcoming visit is a significant development in the bilateral relationship between the two maritime democracies in the Indo-Pacific region.

    Relations between India and the Philippines have been on an upward trajectory, particularly in the areas of defence and security cooperation. A landmark achievement in this regard was the 2022 agreement for the sale of the BrahMos supersonic cruise missile system to the Philippines, marking India's emergence as an exporter of major defence hardware.

    The state visit is expected to further strengthen this partnership. Discussions are likely to focus on enhancing maritime security cooperation in the context of shared concerns over the South China Sea, expanding trade and investment, and exploring new areas of collaboration in sectors like fintech, healthcare, and space technology. The visit underscores the convergence of strategic interests between New Delhi and Manila as part of India's "Act East" policy and its broader vision for a free, open, and inclusive Indo-Pacific.`,
    date: '2025-07-31',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Southeast Asia Correspondent',
    tags: ['Philippines', 'State Visit', 'Act East Policy'],
    views: 11500,
    likes: 823
  },
  {
    id: '23',
    title: 'India-Japan Foreign Secretary Level Dialogue Held in New Delhi',
    shortDescription: 'India\'s Foreign Secretary met with Japan\'s Vice-Minister for Foreign Affairs for a bilateral dialogue in New Delhi to review and advance the Special Strategic and Global Partnership.',
    fullContent: `A bilateral Foreign Secretary-Vice Minister Dialogue between India and Japan was held in New Delhi on July 28, 2025. The meeting was a key component of the regular high-level consultations between the two countries to review the progress of their "Special Strategic and Global Partnership".

    The dialogue covered a wide spectrum of bilateral, regional, and global issues of mutual interest. Key areas of discussion likely included the advancement of infrastructure projects in India and third countries, such as the Mumbai-Ahmedabad High-Speed Rail and connectivity projects in India's Northeast and the wider Indo-Pacific. Defence and security cooperation, including joint military exercises and collaboration in defence technology, would have been a central theme, especially in the context of the Quadrilateral Security Dialogue (Quad).

    The meeting also provided an opportunity to align positions on regional challenges, including the situation in the South China Sea and the East China Sea, and to coordinate efforts in multilateral forums. This dialogue reinforces the central role of the India-Japan partnership as a cornerstone of stability and a driver of economic growth in the Indo-Pacific region.`,
    date: '2025-07-28',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Japan Desk',
    tags: ['India-Japan Relations', 'Strategic Partnership', 'Indo-Pacific'],
    views: 13400,
    likes: 967
  },
  {
    id: '24',
    title: 'G7 Summit in Kananaskis Focuses on Economic Security, AI, and China',
    shortDescription: 'The G7 leaders, meeting in Canada, agreed on a coordinated strategy to de-risk supply chains, counter China\'s non-market economic practices, and establish governance frameworks for Artificial Intelligence.',
    fullContent: `The Group of Seven (G7) Summit, held in Kananaskis, Alberta, Canada, concluded with a clear focus on building resilient economies and addressing challenges posed by global geopolitical shifts. The leaders of Canada, France, Germany, Italy, Japan, the UK, and the US, along with EU representatives, discussed economic stability, energy security, and the digital transition.

    A central theme of the summit was economic security and the need to counter China's "non-market policies and practices" that lead to harmful overcapacity and distort global trade. The G7 leaders committed to "de-risking" their economies by diversifying supply chains and reducing critical dependencies. A key outcome was the launch of the Canada-led "Critical Minerals Production Alliance" to secure supply chains for advanced manufacturing.

    On technology, the leaders committed to advancing the "Hiroshima AI Process Comprehensive Policy Framework," emphasizing the need for secure, responsible, and trustworthy AI adoption. In geopolitics, the summit reiterated unwavering support for Ukraine, called for an immediate and permanent ceasefire in Gaza, and expressed serious concerns about China's destabilizing activities in the Taiwan Strait and the South and East China Seas.`,
    date: '2025-06-17',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'International Affairs Analyst',
    tags: ['G7 Summit', 'Economic Security', 'AI Governance'],
    views: 18600,
    likes: 1342
  },
  {
    id: '25',
    title: 'BRICS Summit in Rio Focuses on Climate Finance and Global South Leadership',
    shortDescription: 'The BRICS summit in Rio de Janeiro concluded with a strong focus on climate action and sustainable development, positioning the bloc as a leader for the Global South.',
    fullContent: `The 17th BRICS Summit, hosted by Brazil in Rio de Janeiro, marked a strategic pivot for the bloc, focusing on sustainable development and climate leadership under the theme "Strengthening Global South Cooperation for a More Inclusive and Sustainable Governance". The summit, which brought together leaders from Brazil, Russia, India, China, South Africa, and its new members, resulted in several key initiatives aimed at creating an alternative development and climate finance architecture.

    A major outcome was the "Leaders' Framework Declaration on Climate Finance," which called for mobilizing $300 billion annually by 2035 for climate investments in developing nations. The summit endorsed Brazil's "Tropical Forests Forever Fund" (TFFF), an initiative to channel funds to countries for forest conservation. To counter what are perceived as "green trade barriers" like the EU's Carbon Border Adjustment Mechanism (CBAM), the bloc announced the creation of a "Laboratory on Trade, Climate Change and Sustainable Development".

    Furthermore, the BRICS leaders issued a statement on the governance of Artificial Intelligence, advocating for a development-centric approach that empowers the Global South and reduces digital inequalities. These outcomes signify BRICS' evolution from a reactive critic of the Western-led order to a proactive architect of parallel multilateral frameworks.`,
    date: '2025-07-07',
    category: 'International',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'BRICS Correspondent',
    tags: ['BRICS Summit', 'Climate Finance', 'Global South'],
    views: 21700,
    likes: 1654
  },
  {
    id: '26',
    title: 'RBI Announces 100 Bps Cut in Cash Reserve Ratio (CRR)',
    shortDescription: 'The RBI announced a significant 100 basis point reduction in the Cash Reserve Ratio (CRR), to be implemented in four phases, aiming to inject substantial liquidity into the banking system.',
    fullContent: `Complementing the repo rate cut, the Reserve Bank of India announced a major liquidity-enhancing measure: a 100 basis point (1%) reduction in the Cash Reserve Ratio (CRR). The CRR, which is the fraction of total deposits that banks must hold as reserves with the RBI, will be lowered from 4.0% to 3.0%.

    This reduction will be implemented in a staggered manner to ensure a smooth infusion of liquidity without causing market disruptions. The cut will occur in four equal tranches of 25 bps each, with effect from the fortnights beginning September 6, October 4, November 1, and November 29, 2025. This phased approach is expected to release approximately ₹2.5 lakh crore of primary liquidity into the banking system by the end of November 2025.

    The primary objective of the CRR cut is to improve the transmission of the recent repo rate reductions. By increasing the lendable resources available with banks, the RBI aims to lower their cost of funds and encourage them to pass on the benefit of lower interest rates to borrowers more quickly and effectively. This dual-pronged approach of cutting both the repo rate and CRR signals the RBI's strong intent to tackle slowing credit growth and support the nascent economic recovery.`,
    date: '2025-06-06',
    category: 'Economics',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Banking Correspondent',
    tags: ['RBI', 'CRR', 'Banking Liquidity'],
    views: 17800,
    likes: 1234
  },
  {
    id: '27',
    title: 'India\'s M&A Market Sees Rise in Volume but Dip in Value in H1 2025',
    shortDescription: 'India\'s mergers and acquisitions (M&A) market recorded a record number of deals in the first half of 2025, though the total value of these transactions declined compared to the previous year.',
    fullContent: `The Indian M&A landscape in the first half of 2025 presented a mixed picture. While the total deal value saw a year-on-year decline of 5.7% to $41.49 billion, the deal volume surged by 4.6% to a record 1,577 transactions. This divergence indicates a significant market trend: a shift away from mega-transactions towards a higher frequency of mid-sized, strategic acquisitions.

    The market activity was primarily driven by deals in the healthcare, infrastructure, and financial services sectors. The decline in overall value is partly attributable to the absence of a mega-deal comparable to the HDFC-HDFC Bank merger of 2022, which had significantly inflated the figures for that period.

    The current trend suggests a maturing of the Indian corporate sector, where companies are increasingly using M&A not just for scale but for strategic capability enhancement, market entry, and portfolio consolidation. Despite a more cautious environment in the second quarter, analysts remain optimistic, anticipating a stronger second half driven by sectors like renewable energy and digital infrastructure, supported by recent interest rate cuts and greater policy clarity.`,
    date: '2025-06-30',
    category: 'Business',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'M&A Analyst',
    tags: ['M&A Market', 'Corporate Deals', 'Business Trends'],
    views: 15200,
    likes: 1087
  },
  {
    id: '28',
    title: 'Infrastructure Sector Witnesses Major M&A Activity',
    shortDescription: 'India\'s infrastructure sector saw significant M&A activity in the first half of 2025, led by a major overseas acquisition by the Adani Group.',
    fullContent: `Alongside healthcare, the infrastructure sector was a primary driver of M&A deals in India during the first half of 2025. The activity in this space reflects the aggressive expansion strategies of large Indian conglomerates and the government's continued focus on infrastructure development.

    The second-largest deal of the period was in this sector: Adani Ports and Special Economic Zone (APSEZ) acquired Abbot Point Port Holdings in Australia for $1.97 billion from its promoter entities. This transaction is part of the Adani Group's broader strategy to expand its global footprint in the ports and logistics business. The group has also announced ambitious plans to invest up to $20 billion annually in India's infrastructure sector, including new greenfield projects.

    Furthermore, the race to acquire Jaiprakash Industries, a company with assets in cement and power, has attracted bids from major players like the Adani Group and Vedanta, with final offers expected to exceed $1.4 billion. This sustained interest underscores the strategic importance of core infrastructure assets in India's long-term growth story.`,
    date: '2025-06-30',
    category: 'Business',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Infrastructure Correspondent',
    tags: ['Infrastructure', 'Adani Group', 'Port Development'],
    views: 13600,
    likes: 945
  },
  {
    id: '29',
    title: 'Private Equity Trends in India H1 2025',
    shortDescription: 'Private equity (PE) investments in India saw a 20% increase in volume in the first half of 2025, though average deal sizes declined amid a more cautious investment climate.',
    fullContent: `Private equity activity remained a significant component of India's deal landscape in the first half of 2025. According to a PwC report, PE investments saw a 20% increase in deal volume compared to the same period in 2024. However, the overall trend was one of cautious optimism.

    While the number of PE-backed deals held steady, the average ticket size saw a decline. This was largely due to muted investor interest in previously high-growth sectors like consumer tech and edtech, which are currently undergoing valuation corrections and facing tighter capital flows. Instead, PE funds demonstrated targeted investment strategies focused on sectors with strong fundamentals, such as healthcare, pharmaceuticals, renewable energy, and real estate, particularly in data centers and warehousing.

    Despite the conservatism in deal size, global PE giants remain bullish on India's long-term prospects. Blackstone Inc. announced plans to double its India investments to $100 billion, while Brookfield Asset Management also committed to investing $100 billion over the next five years. This indicates that significant "dry powder" is available and is expected to be deployed more aggressively in the second half of the year as macroeconomic conditions stabilize.`,
    date: '2025-07-28',
    category: 'Business',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Private Equity Analyst',
    tags: ['Private Equity', 'Investment Trends', 'Venture Capital'],
    views: 12400,
    likes: 876
  },
  {
    id: '30',
    title: 'CEO Appointment: Deepak Reddy Takes Charge at Manappuram Finance',
    shortDescription: 'Manappuram Finance Ltd. appointed Deepak Reddy, a veteran of the financial services industry, as its new Chief Executive Officer.',
    fullContent: `Manappuram Finance, a leading non-banking financial company (NBFC) in India, announced a significant leadership transition with the appointment of Deepak Reddy as its new Chief Executive Officer, effective August 1, 2025. V.P. Nandakumar, the long-serving Managing Director and CEO, has transitioned to the role of Managing Director, to whom Mr. Reddy will report.

    This appointment signals a strategic move towards professionalizing the company's top management. Mr. Reddy brings over 30 years of extensive experience in the finance sector, having held senior positions at prominent organizations such as Bajaj FinServ (17 years), American Express Bank (9 years), and Standard Chartered Bank. His leadership philosophy is described as empowering teams to "envision, enable and execute," with a focus on building a future-ready organization.

    The move is seen as an effort to leverage external expertise to navigate the evolving regulatory and competitive landscape of the Indian financial services industry.`,
    date: '2025-08-01',
    category: 'Business',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Financial Services Reporter',
    tags: ['CEO Appointment', 'NBFC', 'Financial Services'],
    views: 8900,
    likes: 634
  },
  {
    id: '31',
    title: 'CEO Appointment: Stéphane Deblaise to Lead Renault Group in India',
    shortDescription: 'Renault Group appointed Stéphane Deblaise as the new CEO for its India operations, signaling a strengthened focus on the Indian market.',
    fullContent: `French automotive major Renault Group has appointed Stéphane Deblaise as the new Chief Executive Officer for its operations in India, with his term set to begin on September 1, 2025. This strategic appointment is part of Renault's plan to strengthen its presence in the Indian market and expand its role as a key industrial hub for exports.

    Mr. Deblaise will have direct responsibility for all of Renault's local entities and will be tasked with defining and implementing the group's strategy in India. He is a veteran of the Renault Group, having held several key international positions, including roles in Latin America and as Vice President of Product Planning & Programs at Dongfeng-Renault in China.

    The appointment of a new CEO specifically for India underscores the country's growing importance in Renault's global ambitions. The company aims to leverage its Indian manufacturing base not only to cater to the growing domestic demand but also to serve as a critical export hub, aligning with the "Make in India" initiative.`,
    date: '2025-08-01',
    category: 'Business',
    imageUrl: '/placeholder.svg',
    isBreaking: false,
    author: 'Automotive Correspondent',
    tags: ['CEO Appointment', 'Renault', 'Automotive Industry'],
    views: 10200,
    likes: 723
  },
  {
    id: '32',
    title: 'CEO Appointment: Shailesh Jejurikar Named Global CEO of Procter & Gamble',
    shortDescription: 'US consumer goods giant Procter & Gamble (P&G) named Indian-origin executive Shailesh Jejurikar as its next global President and Chief Executive Officer.',
    fullContent: `In a major development for Indian leadership on the global stage, Procter & Gamble (P&G) announced that Shailesh Jejurikar will become the company's next President and CEO, effective January 1, 2026. Mr. Jejurikar, who currently serves as the Chief Operating Officer (COO), will succeed Jon Moeller, who will transition to the role of Executive Chairman.

    This appointment places Mr. Jejurikar at the helm of one of the world's largest consumer goods corporations. He joined P&G in 1989 and has been a part of its global leadership team since 2014. His extensive career at the company has seen him lead multiple businesses across both developed and developing markets, including North America, Europe, Asia, and Latin America. He is credited with delivering strong results in P&G's core fabric care and home care businesses and has been instrumental in driving strategic transformation across the company's supply chain and IT operations.

    Mr. Jejurikar's elevation is a significant milestone, adding him to the growing list of Indian-origin executives leading major multinational corporations, a testament to the global recognition of Indian managerial talent.`,
    date: '2025-07-30',
    category: 'Business',
    imageUrl: '/placeholder.svg',
    isBreaking: true,
    author: 'Corporate Affairs Reporter',
    tags: ['CEO Appointment', 'Indian Executive', 'Global Leadership'],
    views: 25400,
    likes: 2089
  }
];

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [isLoading, setIsLoading] = useState(false);

  const addNews = (newsItem: Omit<NewsItem, 'id'>) => {
    const id = Date.now().toString();
    const newNews: NewsItem = {
      ...newsItem,
      id,
      views: 0,
      likes: 0,
    };
    setNews(prev => [newNews, ...prev]);
  };

  const updateNews = (id: string, updates: Partial<NewsItem>) => {
    setNews(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  const getNewsByCategory = (category: string) => {
    if (category === 'All') return news;
    return news.filter(item => item.category === category);
  };

  const getNewsByDate = (date: string) => {
    return news.filter(item => item.date === date);
  };

  const searchNews = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return news.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.shortDescription.toLowerCase().includes(lowercaseQuery) ||
      item.fullContent.toLowerCase().includes(lowercaseQuery) ||
      item.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Sort news by date (newest first) whenever news array changes
  useEffect(() => {
    setNews(prev => [...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const contextValue: NewsContextType = {
    news,
    addNews,
    updateNews,
    deleteNews,
    getNewsByCategory,
    getNewsByDate,
    searchNews,
    isLoading,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};