'use strict';
import { Breadcrumb, Button, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import {
  Award,
  Calendar,
  ChevronLeft,
  Clock,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const DeveloperProfile = ({ profile }) => {
  const router = useRouter();
  const { data } = profile;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 space-y-4">
          <Breadcrumb
            items={[
              { title: <Link href="/profile">Talents</Link> },
              { title: `${data.firstName} ${data.secondName}` },
            ]}
            className="text-sm"
          />
          <Button
            icon={<ChevronLeft className="w-4 h-4" />}
            onClick={() => router.back()}
            className="flex items-center hover:text-indigo-600"
          >
            Back to Talents
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Card Component */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 space-y-6">
                {/* Profile Header */}
                <div className="text-center">
                  {/* Avatar with Verified Badge */}
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-indigo-600 text-3xl font-medium">
                        {data.firstName[0]}
                        {data.secondName[0]}
                      </span>
                    </div>
                    <Tooltip
                      title={
                        data.isVerified
                          ? 'Verified Profile'
                          : 'Unverified Profile'
                      }
                      placement="right"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-4 bottom-4 bg-white rounded-full p-1 shadow-md cursor-help"
                      >
                        <Award
                          className={`w-5 h-5 ${
                            data.isVerified ? 'text-green-600' : 'text-red-500'
                          }`}
                        />
                      </motion.div>
                    </Tooltip>
                  </div>
                  {/* <div className="relative inline-block">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-indigo-600 text-3xl font-medium">
                        {data.firstName[0]}
                        {data.secondName[0]}
                      </span>
                    </div>
                    {data.isVerified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-4 bottom-4 bg-white rounded-full p-1 shadow-md"
                      >
                        <Award className="w-5 h-5 text-green-600" />
                      </motion.div>
                    )}
                  </div> */}

                  {/* Name and Role */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {data.firstName} {data.secondName}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full">
                      Senior Software Engineer
                    </span>
                  </div>

                  {/* Experience Badge - moved from the bottom */}
                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span className="text-indigo-600 font-medium">
                        {data.yearsOfExperience} Years of Experience
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{data.user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{data.phone}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm border border-indigo-200 bg-indigo-50 text-indigo-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button Component */}
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Job Invitation
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Summary Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
            >
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">{data.summary}</p>
            </motion.div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Experience</h3>
              <div className="space-y-6">
                {data.experience.map((exp: Experience, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-8 pb-8 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 h-full w-px bg-indigo-200">
                      <div className="absolute top-2 -left-2 w-4 h-4 rounded-full bg-indigo-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">{exp.role}</h4>
                    <p className="text-indigo-600 text-sm mb-2">
                      {exp.company}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </div>
                    <p className="text-gray-600">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* References Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">
                Professional References
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.references.map((ref: Reference, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {ref.name[0]}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {ref.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {ref.relationship}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{ref.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{ref.phoneNumber}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            {data.nonAndelaProgram && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Additional Information
                  </h3>
                  <p className="text-gray-600">
                    Program: {data.nonAndelaProgram} (
                    {data.nonAndelaProgramYear})
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperProfile;
