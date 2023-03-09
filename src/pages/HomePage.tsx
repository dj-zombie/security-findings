import React from 'react';

function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <img src="logo.png" className="w-64 mx-auto" alt="logo" />
      <h1 className="text-4xl">Welcome</h1>
      <p className="text-xl my-8">
         to our web application that specializes in managing and remediating security findings. The platform helps organizations streamline their security processes by enabling them to track and remediate known, critical security findings efficiently.
      </p>
      <p className="text-xl my-8">
        This application is designed to streamline the management and review of security alerts from various platforms, such as AWS. As organizations increasingly rely on multiple platforms for their operations, managing security alerts and incidents can quickly become a daunting task. Our platform provides a solution that simplifies the process of reviewing security alerts, allowing you to focus on your core business operations. With our tool, you can easily track and manage alerts from different platforms, enabling faster response times and ultimately enhancing your organization's overall security posture.
      </p>
      <p className="text-xl my-8">
        With the number of security findings constantly on the rise and the distribution of responsibility across the organization, it's more important than ever to have a tool that can help you operate with sufficient speed. Did you know that it takes an average of 205 days to remediate known, critical security findings, and over 60% of breaches are related to known findings? This is why our platform is designed to help you manage and remediate security findings efficiently.
      </p>
      <p className="text-xl my-8">
         Our founders come from esteemed backgrounds, including Goldman Sachs, Palo Alto Networks, and Meta. They have experienced the pain of slow security processes firsthand, which is why they founded our company to provide a solution. We are proud to be backed by Insight Partners, Hetz Ventures, Shlomo Kramer, and other serial cyber executives.
      </p>
      <p className="text-xl my-8">
        Thank you for choosing our platform to help improve your security process. We are committed to providing you with the best tools and services to ensure your organization stays protected.
      </p>
    </div>
  );
};

export default HomePage;

