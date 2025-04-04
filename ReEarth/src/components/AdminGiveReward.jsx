import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust this import based on your Firebase config
import Navbar from "./Navbar";

const AdminGiveReward = () => {
  const [userData, setUserData] = useState([]);
  const [rewardedUsers, setRewardedUsers] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [rewardedVendors, setRewardedVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showRewardedSection, setShowRewardedSection] = useState(true);
  const [isUpdatingReward, setIsUpdatingReward] = useState(false);
  const [selectedSection, setSelectedSection] = useState("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch rewards data first
        const rewardsSnapshot = await getDocs(collection(db, "Rewards"));
        const rewardsData = {};
        rewardsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.giveReward) {
            rewardsData[doc.id] = data;
          }
        });

        if (selectedSection === "user") {
          // Fetch data from VendorUploadProfile collection
          const vendorSnapshot = await getDocs(
            collection(db, "VendorUploadProfile")
          );
          const vendorData = [];

          // For each vendor, fetch and process their requests
          for (const vendorDoc of vendorSnapshot.docs) {
            const vendorInfo = vendorDoc.data();

            // Check if requests field exists and is not empty
            if (vendorInfo.requests && vendorInfo.requests.length > 0) {
              vendorInfo.requests.forEach((request) => {
                vendorData.push({
                  email: request.email,
                  weight: parseFloat(request.weight) || 0,
                  wasteType: request.wasteType,
                  date: request.requestDate,
                  vendor: vendorInfo.businessName,
                });
              });
            }
          }

          // Fetch data from UserUploadTrash collection
          const userTrashSnapshot = await getDocs(
            collection(db, "UserUploadTrash")
          );
          const userTrashData = [];

          userTrashSnapshot.forEach((doc) => {
            const trashData = doc.data();
            userTrashData.push({
              email: trashData.email,
              weight: parseFloat(trashData.weight) || 0,
              wasteType: trashData.wasteType,
              date: trashData.timestamp,
              vendor: "Direct Upload", // Marking these as direct uploads
            });
          });

          // Combine both data sets
          const combinedData = [...vendorData, ...userTrashData];

          // Aggregate by email
          const aggregatedData = combinedData.reduce((acc, item) => {
            const email = item.email;

            if (!acc[email]) {
              acc[email] = {
                email,
                totalWeight: 0,
                wasteBreakdown: {},
                transactions: [],
              };
            }

            // Add weight to total
            acc[email].totalWeight += item.weight;

            // Add to waste type breakdown
            if (!acc[email].wasteBreakdown[item.wasteType]) {
              acc[email].wasteBreakdown[item.wasteType] = 0;
            }
            acc[email].wasteBreakdown[item.wasteType] += item.weight;

            // Add transaction details
            acc[email].transactions.push({
              weight: item.weight,
              wasteType: item.wasteType,
              date: item.date,
              vendor: item.vendor,
            });

            return acc;
          }, {});

          // Convert to array for rendering and separate rewarded users
          const resultArray = Object.values(aggregatedData);
          const unrewardedUsers = [];
          const rewardedUsersList = [];

          resultArray.forEach((user) => {
            if (rewardsData[user.email]) {
              // Add reward info to user data
              user.rewardInfo = rewardsData[user.email];
              rewardedUsersList.push(user);
            } else {
              unrewardedUsers.push(user);
            }
          });

          setUserData(unrewardedUsers);
          setRewardedUsers(rewardedUsersList);
        } else if (selectedSection === "vendor") {
          // Fetch VendorUploadProfile collection and process vendor requests based on vendorEmail
          const vendorProfileSnapshot = await getDocs(collection(db, "VendorUploadProfile"));
          const vendorProfileData = [];
          vendorProfileSnapshot.forEach((vendorDoc) => {
            const vendorInfo = vendorDoc.data();
            if (vendorInfo.requests && vendorInfo.requests.length > 0 && vendorInfo.vendorEmail) {
              vendorInfo.requests.forEach((request) => {
                vendorProfileData.push({
                  vendorEmail: vendorInfo.vendorEmail,
                  weight: parseFloat(request.weight) || 0,
                  wasteType: request.wasteType,
                  date: request.requestDate,
                  vendor: vendorInfo.businessName,
                });
              });
            }
          });
          // Fetch UserUploadTrash collection and filter records with vendorEmail
          const userTrashSnapshot = await getDocs(collection(db, "UserUploadTrash"));
          const userTrashVendorData = [];
          userTrashSnapshot.forEach((doc) => {
            const trashData = doc.data();
            if (trashData.vendorEmail) {
              userTrashVendorData.push({
                vendorEmail: trashData.vendorEmail,
                weight: parseFloat(trashData.weight) || 0,
                wasteType: trashData.wasteType,
                date: trashData.timestamp,
                vendor: "Direct Upload",
              });
            }
          });
          const combinedVendorData = [...vendorProfileData, ...userTrashVendorData];
          const aggregatedVendorData = combinedVendorData.reduce((acc, item) => {
            const key = item.vendorEmail;
            if (!acc[key]) {
              acc[key] = { vendorEmail: key, totalWeight: 0, wasteBreakdown: {}, transactions: [] };
            }
            acc[key].totalWeight += item.weight;
            acc[key].wasteBreakdown[item.wasteType] =
              (acc[key].wasteBreakdown[item.wasteType] || 0) + item.weight;
            acc[key].transactions.push({ weight: item.weight, wasteType: item.wasteType, date: item.date, vendor: item.vendor });
            return acc;
          }, {});
          const vendorResultArray = Object.values(aggregatedVendorData);
          const unrewardedVendors = [];
          const rewardedVendorsList = [];
          vendorResultArray.forEach((vendor) => {
            if (rewardsData[vendor.vendorEmail]) {
              vendor.rewardInfo = rewardsData[vendor.vendorEmail];
              rewardedVendorsList.push(vendor);
            } else {
              unrewardedVendors.push(vendor);
            }
          });
          setVendorData(unrewardedVendors);
          setRewardedVendors(rewardedVendorsList);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSection]);

  const handleGiveReward = (email, weight) => {
    setSelectedEmail(email);
    setIsUpdatingReward(false);
    setSelectedWeight(weight);
    setRewardMessage("");
    setIsModalOpen(true);
  };

  // Updated handleUpdateReward to also set selectedWeight
  const handleUpdateReward = (email, currentMessage, weight) => {
    setSelectedEmail(email);
    setRewardMessage(currentMessage || "");
    setSelectedWeight(weight);
    setIsUpdatingReward(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmail("");
    setRewardMessage("");
    setIsUpdatingReward(false);
  };

  const submitReward = async () => {
    if (!selectedEmail || !rewardMessage.trim()) return;

    setSubmitting(true);
    try {
      const rewardsRef = doc(db, "Rewards", selectedEmail);
      const rewardDoc = await getDoc(rewardsRef);

      if (rewardDoc.exists()) {
        // Update existing document including weight
        await updateDoc(rewardsRef, {
          giveReward: true,
          text: rewardMessage,
          weight: selectedWeight,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create new document
        await setDoc(rewardsRef, {
          email: selectedEmail,
          giveReward: true,
          weight: selectedWeight,
          text: rewardMessage,
          createdAt: new Date().toISOString()
        });
      }

      // If giving a new reward (not updating), move the user to the rewarded list
      if (!isUpdatingReward) {
        const userToMove = userData.find(user => user.email === selectedEmail);
        if (userToMove) {
          userToMove.rewardInfo = {
            text: rewardMessage,
            createdAt: new Date().toISOString()
          };
          setRewardedUsers(prev => [...prev, userToMove]);
          setUserData(prev => prev.filter(user => user.email !== selectedEmail));
        }
      } else {
        // Update the reward message in the rewarded users list
        setRewardedUsers(prev => 
          prev.map(user => 
            user.email === selectedEmail 
              ? { 
                  ...user, 
                  rewardInfo: { 
                    ...user.rewardInfo, 
                    text: rewardMessage,
                    updatedAt: new Date().toISOString() 
                  } 
                }
              : user
          )
        );
      }

      closeModal();
      // Show success notification or update UI
    } catch (err) {
      console.error("Error submitting reward:", err);
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );

  return (
    <div className=" bg-green-50 h-screen w-screen pb-12">
      {/* Navigation Buttons for sections */}
      
      
      <Navbar />
      <div className="m-5">

      <div className="flex space-x-4 m-5">
        <button
          onClick={() => setSelectedSection("user")}
          className={`px-4 py-2 rounded ${selectedSection === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Give Reward to User
        </button>
        <button
          onClick={() => setSelectedSection("vendor")}
          className={`px-4 py-2 rounded ${selectedSection === "vendor" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Give Reward to Vendor
        </button>
      </div>


        <div className="bg-green-100 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-green-800">
            {selectedSection === "user" ? "User Waste Tracking" : "Vendor Waste Tracking"}
          </h2>
          <p className="text-green-600">
            Track {selectedSection === "user" ? "user" : "vendor"} waste submissions and distribute rewards
          </p>
        </div>

        {/* Users without rewards */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-green-200 mb-8">
          <div className="bg-green-200 px-6 py-4">
            <h3 className="text-lg font-medium text-green-800">
              {selectedSection === "user" ? "Users Eligible for Rewards" : "Vendors Eligible for Rewards"}
            </h3>
          </div>
          <div className="overflow-x-auto">
            {selectedSection === "user" ? (
              <>
                {userData.length > 0 ? (
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="w-full h-16 border-green-200 border-b py-8 bg-green-100">
                        <th className="text-left pl-4 pr-2 text-green-700">User Email</th>
                        <th className="text-left px-2 text-green-700">Total Waste</th>
                        <th className="text-left px-2 text-green-700">Waste Breakdown</th>
                        <th className="text-left px-2 text-green-700">Last Transaction</th>
                        <th className="text-center px-2 text-green-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user, index) => (
                        <tr
                          key={index}
                          className={`border-green-100 border-b ${
                            index % 2 === 0 ? "bg-green-50" : "bg-white"
                          }`}
                        >
                          <td className="pl-4 pr-2 py-4">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.totalWeight.toFixed(2)} kg
                            </div>
                          </td>
                          <td className="px-2 py-4">
                            <div className="text-sm text-gray-700">
                              {Object.entries(user.wasteBreakdown).map(
                                ([type, weight], i) => (
                                  <div key={i} className="mb-1">
                                    <span className="font-medium text-gray-800">{type}</span>:{" "}
                                    <span className={`${getWasteTypeColor(type)}`}>
                                      {weight.toFixed(2)} kg
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </td>
                          <td className="px-2 py-4">
                            {user.transactions.length > 0 && (
                              <div className="text-sm text-gray-700">
                                <div>
                                  {new Date(
                                    user.transactions[
                                      user.transactions.length - 1
                                    ].date
                                  ).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {
                                    user.transactions[user.transactions.length - 1]
                                      .vendor
                                  }
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-2 py-4 text-center">
                            <button
                              onClick={() => handleGiveReward(user.email, user.totalWeight.toFixed(2))}
                              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-sm"
                            >
                              Give Reward
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No users pending rewards
                  </div>
                )}
              </>
            ) : (
              <>
                {vendorData.length > 0 ? (
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="w-full h-16 border-green-200 border-b py-8 bg-green-100">
                        <th className="text-left pl-4 pr-2 text-green-700">Vendor Email</th>
                        <th className="text-left px-2 text-green-700">Total Waste</th>
                        <th className="text-left px-2 text-green-700">Waste Breakdown</th>
                        <th className="text-left px-2 text-green-700">Last Transaction</th>
                        <th className="text-center px-2 text-green-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorData.map((vendor, index) => (
                        <tr key={index} className={`border-green-100 border-b ${index % 2 === 0 ? "bg-green-50" : "bg-white"}`}>
                          <td className="pl-4 pr-2 py-4">
                            <div className="text-sm font-medium text-gray-900">{vendor.vendorEmail}</div>
                          </td>
                          <td className="px-2 py-4">
                            <div className="text-sm font-medium text-gray-900">{vendor.totalWeight.toFixed(2)} kg</div>
                          </td>
                          <td className="px-2 py-4">
                            <div className="text-sm text-gray-700">
                              {Object.entries(vendor.wasteBreakdown).map(([type, weight], i) => (
                                <div key={i} className="mb-1">
                                  <span className="font-medium text-gray-800">{type}</span>:{" "}
                                  <span className={`${getWasteTypeColor(type)}`}>{weight.toFixed(2)} kg</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-2 py-4">
                            {vendor.transactions.length > 0 && (
                              <div className="text-sm text-gray-700">
                                <div>{new Date(vendor.transactions[vendor.transactions.length - 1].date).toLocaleDateString()}</div>
                                <div className="text-xs text-gray-500">{vendor.transactions[vendor.transactions.length - 1].vendor}</div>
                              </div>
                            )}
                          </td>
                          <td className="px-2 py-4 text-center">
                            <button
                              onClick={() => handleGiveReward(vendor.vendorEmail, vendor.totalWeight.toFixed(2))}
                              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-sm"
                            >
                              Give Reward
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-gray-500">No vendors pending rewards</div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Rewarded Users Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-green-200">
          <button 
            className="w-full bg-yellow-100 px-6 py-4 flex justify-between items-center border-b border-yellow-200 hover:bg-yellow-200 transition-colors"
            onClick={() => setShowRewardedSection(!showRewardedSection)}
          >
            <h3 className="text-lg font-medium text-yellow-800">
              {selectedSection === "user" ? "Rewards Given" : "Vendor Rewards Given"}
            </h3>
            <span className="text-yellow-700">
              {showRewardedSection ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </span>
          </button>
          
          {showRewardedSection && (
            <div className="overflow-x-auto">
              {selectedSection === "user" ? (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full h-16 border-yellow-200 border-b py-8 bg-yellow-50">
                      <th className="text-left pl-4 pr-2 text-yellow-700">User Email</th>
                      <th className="text-left px-2 text-yellow-700">Total Waste</th>
                      <th className="text-left px-2 text-yellow-700">Reward Message</th>
                      <th className="text-left px-2 text-yellow-700">Reward Date</th>
                      <th className="text-center px-2 text-yellow-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewardedUsers.map((user, index) => (
                      <tr
                        key={index}
                        className={`border-yellow-100 border-b ${
                          index % 2 === 0 ? "bg-yellow-50" : "bg-white"
                        }`}
                      >
                        <td className="pl-4 pr-2 py-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.totalWeight.toFixed(2)} kg
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="text-sm text-gray-700">
                            {user.rewardInfo?.text || "No message"}
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="text-sm text-gray-700">
                            {user.rewardInfo?.updatedAt 
                              ? new Date(user.rewardInfo.updatedAt).toLocaleDateString() 
                              : user.rewardInfo?.createdAt 
                                ? new Date(user.rewardInfo.createdAt).toLocaleDateString()
                                : "Unknown date"}
                          </div>
                        </td>
                        <td className="px-2 py-4 text-center">
                          <button
                            onClick={() => handleUpdateReward(user.email, user.rewardInfo?.text, user.totalWeight.toFixed(2))}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-sm"
                          >
                            Update Reward
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full h-16 border-yellow-200 border-b py-8 bg-yellow-50">
                      <th className="text-left pl-4 pr-2 text-yellow-700">Vendor Email</th>
                      <th className="text-left px-2 text-yellow-700">Total Waste</th>
                      <th className="text-left px-2 text-yellow-700">Reward Message</th>
                      <th className="text-left px-2 text-yellow-700">Reward Date</th>
                      <th className="text-center px-2 text-yellow-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewardedVendors.map((vendor, index) => (
                      <tr key={index} className={`border-yellow-100 border-b ${index % 2 === 0 ? "bg-yellow-50" : "bg-white"}`}>
                        <td className="pl-4 pr-2 py-4">
                          <div className="text-sm font-medium text-gray-900">{vendor.vendorEmail}</div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="text-sm font-medium text-gray-900">{vendor.totalWeight.toFixed(2)} kg</div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="text-sm text-gray-700">{vendor.rewardInfo?.text || "No message"}</div>
                        </td>
                        <td className="px-2 py-4">
                          <div className="text-sm text-gray-700">
                            {vendor.rewardInfo?.updatedAt 
                              ? new Date(vendor.rewardInfo.updatedAt).toLocaleDateString() 
                              : vendor.rewardInfo?.createdAt 
                                ? new Date(vendor.rewardInfo.createdAt).toLocaleDateString()
                                : "Unknown date"}
                          </div>
                        </td>
                        <td className="px-2 py-4 text-center">
                          <button
                            onClick={() => handleUpdateReward(vendor.vendorEmail, vendor.rewardInfo?.text, vendor.totalWeight.toFixed(2))}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-sm"
                          >
                            Update Reward
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reward Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-green-800">
                {isUpdatingReward ? `Update Reward for ${selectedEmail}` : `Send Reward to ${selectedEmail}`}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="rewardMessage" className="block text-sm font-medium text-gray-700 mb-1">
                Reward Message
              </label>
              <textarea
                id="rewardMessage"
                value={rewardMessage}
                onChange={(e) => setRewardMessage(e.target.value)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                placeholder="Enter your reward message here..."
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={submitReward}
                disabled={submitting || !rewardMessage.trim()}
                className={`px-4 py-2 ${isUpdatingReward ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition duration-300 ${
                  submitting || !rewardMessage.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting 
                  ? "Submitting..." 
                  : isUpdatingReward 
                    ? "Update Reward" 
                    : "Send Reward"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get color based on waste type
const getWasteTypeColor = (wasteType) => {
  const type = wasteType.toLowerCase();
  if (type.includes("plastic")) return "text-blue-600";
  if (type.includes("paper")) return "text-yellow-600";
  if (type.includes("metal")) return "text-gray-600";
  if (type.includes("glass")) return "text-teal-600";
  if (type.includes("organic")) return "text-green-600";
  if (type.includes("electronic")) return "text-purple-600";
  return "text-gray-600";
};

export default AdminGiveReward;