'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Trophy, Users, Clock, Share2, Bookmark, AlertCircle, CheckCircle, Plus, X } from 'lucide-react';
import { fetchCompetitionBySlug } from '../../../store/competition/competitionActions';



// Competition Registration Form Component
const CompetitionRegistrationForm = ({ competitionId, competitionTitle, onSubmit, formData, setFormData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Auto-fill team leader in team members when team leader name changes
    const handleTeamLeaderChange = (e) => {
      const leaderName = e.target.value;
      setFormData(prev => ({
        ...prev,
        teamLeaderName: leaderName,
        teamMembers: [leaderName, prev.teamMembers[1], ...prev.teamMembers.slice(2)]
      }));
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));

      // Clear error when user starts typing
      if (formErrors[name]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const handleTeamMemberChange = (index, value) => {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.map((member, i) =>
          i === index ? value : member
        )
      }));
    };

    const addTeamMember = () => {
      if (formData.teamMembers.length < 6) {
        setFormData(prev => ({
          ...prev,
          teamMembers: [...prev.teamMembers, '']
        }));
      }
    };

    const removeTeamMember = (index) => {
      if (index > 1 && formData.teamMembers.length > 2) { // Can't remove first 2 members
        setFormData(prev => ({
          ...prev,
          teamMembers: prev.teamMembers.filter((_, i) => i !== index)
        }));
      }
    };

    const validateForm = () => {
      const errors = {};

      if (!formData.teamName.trim()) errors.teamName = 'Team name is required';
      if (!formData.teamLeaderName.trim()) errors.teamLeaderName = 'Team leader name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
      if (!formData.mobile.trim()) errors.mobile = 'Mobile number is required';
      else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) errors.mobile = 'Invalid mobile number';
      if (!formData.collegeName.trim()) errors.collegeName = 'College/Institution name is required';
      if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms and conditions';

      // Validate team members
      const validMembers = formData.teamMembers.filter(member => member.trim());
      if (validMembers.length < 2) errors.teamMembers = 'Minimum 2 team members required';
      if (validMembers.length > 6) errors.teamMembers = 'Maximum 6 team members allowed';
      if (!formData.teamMembers[1].trim()) errors.teamMember2 = 'Second team member name is required';

      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        onSubmit({
          ...formData,
          teamMembers: formData.teamMembers.filter(member => member.trim())
        });
        setIsSubmitting(false);
      }, 1000);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Team Name */}
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1 font-body">
            Team Name *
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleInputChange}
            className="w-full text-primary-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-body text-base"
            placeholder="Enter your team name"
          />
          {formErrors.teamName && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.teamName}</p>}
        </div>

        {/* Team Leader Name */}
        <div>
          <label htmlFor="teamLeaderName" className="block text-sm font-medium text-gray-700 mb-1 font-body">
            Team Leader Name *
          </label>
          <input
            type="text"
            id="teamLeaderName"
            name="teamLeaderName"
            value={formData.teamLeaderName}
            onChange={handleTeamLeaderChange}
            className="w-full text-primary-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-body text-base"
            placeholder="Enter team leader name"
          />
          {formErrors.teamLeaderName && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.teamLeaderName}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-body">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full text-primary-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-body"
            placeholder="Enter email address"
          />
          {formErrors.email && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.email}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1 font-body">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full text-primary-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-body"
            placeholder="Enter mobile number"
          />
          {formErrors.mobile && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.mobile}</p>}
        </div>

        {/* Team Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-body">
            Team Members (Min 2, Max 6) *
          </label>
          <div className="space-y-2">
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                    disabled={index === 0} // First member (leader) is auto-filled and non-editable
                    className={`w-full text-primary-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-body ${index === 0 ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    placeholder={
                      index === 0 ? 'Team Leader (auto-filled)' :
                        index === 1 ? 'Team Member 2 (required)' :
                          `Team Member ${index + 1} (optional)`
                    }
                  />
                </div>
                {index > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label={`Remove team member ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            {formData.teamMembers.length < 6 && (
              <button
                type="button"
                onClick={addTeamMember}
                className="w-full py-2 border-2 border-dashed border-primary-300 text-primary-600 hover:border-primary-500 hover:text-primary-700 rounded-lg transition-colors flex items-center justify-center gap-2 font-body"
              >
                <Plus className="h-4 w-4" />
                Add Team Member
              </button>
            )}
          </div>
          {formErrors.teamMembers && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.teamMembers}</p>}
          {formErrors.teamMember2 && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.teamMember2}</p>}
        </div>

        {/* College/Institution Name */}
        <div>
          <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1 font-body">
            College/Institution Name *
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleInputChange}
            className="w-full text-primary-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-body"
            placeholder="Enter college/institution name"
          />
          {formErrors.collegeName && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.collegeName}</p>}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-700 font-body">
            I accept the <Link href="/terms" className="text-primary-600 hover:text-primary-800 underline">Terms and Conditions</Link> *
          </label>
        </div>
        {formErrors.acceptTerms && <p className="text-red-500 text-xs mt-1 font-body">{formErrors.acceptTerms}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-6 rounded-lg font-medium transition-colors font-body"
        >
          {isSubmitting ? 'Registering...' : 'Register Now'}
        </button>
      </form>
    );
  };

export default function CompetitionDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    email: '',
    mobile: '',
    teamMembers: ['', ''], // First will be auto-filled, second is required
    collegeName: '',
    acceptTerms: false
  });

  // Get competition data from Redux store and URL params
  const params = useParams();
  const dispatch = useDispatch();
  const { currentCompetition, error } = useSelector(state => state.competitions);
  const slug = params.slug;

  // Fetch competition data by slug
  useEffect(() => {
    if (slug) {
      dispatch(fetchCompetitionBySlug(slug));
    }
  }, [slug, dispatch]);

  // Use Redux data or fallback to null
  const competition = currentCompetition;

  const handleRegistration = async (data) => {
    try {
      const response = await fetch(`https://api.churanchacha.in/api/competitions/${competition.id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          competitionId: competition.id,
          competitionTitle: competition.title,
          registrationData: {
            teamName: data.teamName,
            teamLeaderName: data.teamLeaderName,
            email: data.email,
            mobile: data.mobile,
            teamMembers: data.teamMembers,
            collegeName: data.collegeName,
            acceptTerms: data.acceptTerms
          },
          metadata: {
            registrationTimestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ipAddress: 'client-side' // Backend will capture the real IP
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsRegistered(true);
        console.log('Registration successful:', result.data);
        // You could also show a success toast/notification here
      } else {
        console.error('Registration failed:', result.message);
        // Handle error - could show error message to user
        alert(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  // Show loading state if no competition data
  if (!competition) {
    return (
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-primary-10 mb-4 font-heading">Loading Competition...</h2>
            <p className="text-gray-600 font-body">Please wait while we load the competition details.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if competition not found
  if (error.currentCompetition) {
    return (
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4 font-heading">Competition Not Found</h2>
            <p className="text-gray-600 font-body mb-4">The competition you're looking for could not be found.</p>
            <Link href="/competition" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors font-body">
              Back to Competitions
            </Link>
          </div>
        </div>
      </div>
    );
  }
  //share button 
const ShareButton = () => {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this competition on Churan Chacha!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 md:px-6 rounded-lg font-medium transition-colors flex items-center gap-2 font-body text-sm md:text-base"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
};

  return (
    <div className="py-4 md:py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/competition"
          className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4 md:mb-8 font-body"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
          Back to Competitions
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8">
          <div className="relative h-[250px] md:h-[500px] bg-gray-100">
            {/* Mobile Image - Shows only on mobile */}
            <Image
              src={competition.mobileImage || competition.image}
              alt={competition.title}
              fill
              sizes="100vw"
              className="object-cover block md:hidden"
              priority
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Desktop Image - Shows only on desktop */}
            <Image
              src={competition.image}
              alt={competition.title}
              fill
              sizes="100vw"
              className="object-cover hidden md:block"
              priority
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0" />
          </div>

          <div className="p-4 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-4">
              <span className="bg-green-100 text-green-700 px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium font-body">
                {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
              </span>
              <span className="text-gray-600 text-xs md:text-sm flex items-center font-body">
                <Users className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                {competition.participants} Participants
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl text-primary-10 mb-3 md:mb-4 font-heading leading-tight">
              {competition.title}
            </h1>

            <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 font-body leading-relaxed">
              {competition.description}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <ShareButton />
              {/* <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 md:px-6 rounded-lg font-medium transition-colors flex items-center gap-2 font-body text-sm md:text-base">
                
                <Share2 className="h-4 w-4" />
                Share
              </button> */}
              {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 md:px-6 rounded-lg font-medium transition-colors flex items-center gap-2 font-body text-sm md:text-base">
                <Bookmark className="h-4 w-4" />
                Save
              </button> */}
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 md:px-6 rounded-lg font-medium transition-colors flex items-center gap-2 font-body text-sm md:text-base">
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Competition Details */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6 md:mb-8">
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                {['overview', 'rules', 'timeline', 'judging'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 md:px-6 md:py-4 text-sm font-medium border-b-2 font-body whitespace-nowrap ${activeTab === tab
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-primary-600'
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-4 md:p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl md:text-2xl text-primary-10 mb-3 md:mb-4 font-heading">About the Competition</h2>
                    <div className="text-gray-700 font-body">
                      <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">{competition.longDescription}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'rules' && (
                  <div>
                    <h2 className="text-xl md:text-2xl text-primary-10 mb-3 md:mb-4 font-heading">Rules & Guidelines</h2>
                    <ul className="space-y-3">
                      {competition.rules && competition.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs md:text-sm font-medium font-body">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 font-body text-sm md:text-base leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div>
                    <h2 className="text-xl md:text-2xl text-primary-10 mb-3 md:mb-4 font-heading">Timeline</h2>
                    <div className="space-y-4 md:space-y-6">
                      {competition.timeline && competition.timeline.map((item, index) => (
                        <div key={index} className="flex gap-3 md:gap-4">
                          <div className="flex-shrink-0 w-16 md:w-24 text-xs md:text-sm text-gray-600 font-body">
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-primary-10 font-heading text-sm md:text-base">{item.event}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'judging' && (
                  <div>
                    <h2 className="text-xl md:text-2xl text-primary-10 mb-3 md:mb-4 font-heading">Judging Criteria</h2>
                    <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6 font-body leading-relaxed">
                      {competition.judgingPara1}
                    </p>
                    <div className="space-y-4 md:space-y-6">
                      {competition.judgingCriteria && competition.judgingCriteria.map((criterion, index) => (
                        <div key={index} className="bg-primary-50 rounded-lg p-3 md:p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-primary-10 font-heading text-sm md:text-base">{criterion.criterion}</h3>
                            <span className="text-xs md:text-sm font-medium text-primary-600 font-body">{criterion.weight}</span>
                          </div>
                          <p className="text-gray-700 font-body text-sm md:text-base leading-relaxed">{criterion.description}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm md:text-lg text-gray-700 mt-4 md:mt-6 font-body leading-relaxed">
                      {competition.judgingPara2}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 sticky top-8">
              <div className="mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl text-primary-10 mb-2 font-heading">Prize Pool</h2>
                <div className="flex items-center gap-2 text-base md:text-lg text-gray-700 font-body">
                  <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                  {competition.prize}
                </div>
              </div>

              <div className="mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl text-primary-10 mb-2 font-heading">Important Dates</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 font-body">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary-600" />
                    <span>Starts: {new Date(competition.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 font-body">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary-600" />
                    <span>Ends: {new Date(competition.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {isRegistered ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-body">You have successfully registered for this competition!</span>
                </div>
              ) : (
                <CompetitionRegistrationForm
                  competitionId={competition.id}
                  competitionTitle={competition.title}
                  onSubmit={handleRegistration}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 