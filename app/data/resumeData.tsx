
export const arrayAccessoryTools = [
  "Jira", 
  "Confluence", 
  "BitBucket", 
  "Github", 
  "Github Actions", 
  "TeamCity", 
  "Jenkins", 
  "Postman", 
  "ConfigCat", 
  "Swagger", 
  "Strapi"
];

export const arrayProgrammingSkills = [
  "Typescript",
  "React",
  "GraphQL",
  "React & Next.js",
  "Node.js & Express",
  "Python Django",
  "GraphQL",
  "RESTful APIs",
  "NoSQL (MongoDB)",
  "SQL (MySQL, Cassandra)",
  "Docker",
];


export interface CloudSkillGroup {
  category: string;
  skills: string[];
}

export const awsSkillGroups: CloudSkillGroup[] = [
  {
    category: "Compute",
    skills: [
      "Lambda",
      "EC2",
    ],
  },
  {
    category: "Networking",
    skills: [
      "API Gateway",
      "CloudFront",
      "Route 53",
    ],
  },
  {
    category: "Storage & Data",
    skills: [
      "S3",
      "RDS",
      "DynamoDB",
    ],
  },
  {
    category: "Security",
    skills: [
      "IAM",
      "CloudTrail",
    ],
  },
  {
    category: "Monitoring & Governance",
    skills: [
      "CloudWatch",
      "CloudFormation",
      "CodeCommit",
    ],
  },
];

export const azureSkillGroups: CloudSkillGroup[] = [
  {
    category: "Identity",
    skills: [
      "Microsoft Entra ID",
      "Azure RBAC",
      "Privileged Identity Management (PIM)",
    ],
  },
  {
    category: "Networking",
    skills: [
      "Azure Virtual Network (VNet)",
      "Network Security Groups (NSG)",
      "Azure Firewall",
      "Private Link",
      "ExpressRoute",
    ],
  },
  {
    category: "Security",
    skills: [
      "Microsoft Defender for Cloud",
      "Microsoft Sentinel",
      "Azure Key Vault",
      "Azure Policy",
      "Confidential Computing",
    ],
  },
  {
    category: "Monitoring",
    skills: [
      "Azure Monitor",
      "Log Analytics",
      "Application Insights",
      "Azure Activity Log",
    ],
  },
];