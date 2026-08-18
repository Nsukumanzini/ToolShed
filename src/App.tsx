import React, { useState, useMemo, useEffect } from 'react';
import {
  Wrench,
  Search,
  PlusCircle,
  ShieldCheck,
  MapPin,
  Sparkles,
  Layers,
  CalendarCheck,
  MessageSquare,
  Leaf,
  HeartHandshake,
  ArrowRight,
  Filter,
  CheckCircle2,
  Building2,
  UserCheck,
} from 'lucide-react';
import {
  ToolItem,
  CategoryType,
  ProjectKit,
  Booking,
  MessageThread,
  UserProfile,
  UserRole,
} from './types';
import {
  INITIAL_TOOLS,
  PROJECT_KITS,
  INITIAL_BOOKINGS,
  INITIAL_MESSAGES,
  COMMUNITY_METRICS,
  DEMO_USERS,
  SOUTH_AFRICAN_CITIES,
} from './data/mockTools';
import {
  auth,
  fetchToolsFromFirestore,
  saveToolToFirestore,
  updateToolAvailability,
  saveBookingToFirestore,
  updateBookingStatusInFirestore,
  syncUserProfile,
  getUserProfile,
  logOutFirebase,
} from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CommunityStatsBanner } from './components/CommunityStatsBanner';
import { ToolFilters } from './components/ToolFilters';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { BookingModal } from './components/BookingModal';
import { ProjectKitsView } from './components/ProjectKitsView';
import { ProjectKitModal } from './components/ProjectKitModal';
import { ListToolWizard } from './components/ListToolWizard';
import { SellerPortal } from './components/SellerPortal';
import { CustomerPortal } from './components/CustomerPortal';
import { LenderBorrowerDashboard } from './components/LenderBorrowerDashboard';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AuthModal } from './components/AuthModal';
import { MessagesDrawer } from './components/MessagesDrawer';
import { ProtectionGuaranteeModal } from './components/ProtectionGuaranteeModal';
import { EarningsCalculatorModal } from './components/EarningsCalculatorModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ToastNotification, ToastMessage } from './components/ToastNotification';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<
    'browse' | 'projects' | 'about' | 'contact' | 'list-tool' | 'dashboard' | 'seller-portal'
  >('browse');

  // User & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_USERS[0]); // Default to Johan (Seller) in Ermelo
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalRole, setAuthModalRole] = useState<UserRole>('customer');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Data State
  const [tools, setTools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [projectKits, setProjectKits] = useState<ProjectKit[]>(PROJECT_KITS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [messages, setMessages] = useState<MessageThread[]>(INITIAL_MESSAGES);
  const [myListedTools, setMyListedTools] = useState<ToolItem[]>(
    INITIAL_TOOLS.filter((t) => t.owner.id === DEMO_USERS[0].id || t.owner.name.includes('Johan'))
  );
  const [metrics, setMetrics] = useState(COMMUNITY_METRICS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Ermelo, Mpumalanga');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [selectedPowerSource, setSelectedPowerSource] = useState<string>('All');
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [instantBookingOnly, setInstantBookingOnly] = useState(false);
  const [ownerTypeFilter, setOwnerTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  // Modals & Drawers State
  const [selectedToolForDetail, setSelectedToolForDetail] = useState<ToolItem | null>(null);
  const [bookingToolConfig, setBookingToolConfig] = useState<{
    tool: ToolItem;
    config: {
      days: number;
      startDate: string;
      endDate: string;
      isDelivery: boolean;
      safetyGearIncluded?: boolean;
    };
  } | null>(null);
  const [selectedProjectKit, setSelectedProjectKit] = useState<ProjectKit | null>(null);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<string>(INITIAL_MESSAGES[0]?.id || '');
  const [isProtectionModalOpen, setIsProtectionModalOpen] = useState(false);
  const [isEarningsModalOpen, setIsEarningsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, description?: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Firebase Auth State Listener & Initial Cloud Sync
  useEffect(() => {
    // 1. Sync tools from Firestore on initial load
    fetchToolsFromFirestore()
      .then((cloudTools) => {
        if (cloudTools && cloudTools.length > 0) {
          setTools(cloudTools);
        } else {
          // Seed initial tools to Firestore so they persist
          INITIAL_TOOLS.forEach((tool) => {
            saveToolToFirestore(tool).catch(() => {});
          });
        }
      })
      .catch((err) => console.warn('Could not fetch cloud tools:', err));

    // 2. Listen to Auth changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cloudProfile = await getUserProfile(user.uid);
        if (cloudProfile) {
          setCurrentUser(cloudProfile);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Auth Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login', role: UserRole = 'customer') => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    syncUserProfile(user).catch(() => {});
    if (user.role === 'seller') {
      const userTools = tools.filter(
        (t) => t.owner.id === user.id || t.owner.name.includes(user.name.split(' ')[0])
      );
      if (userTools.length > 0) {
        setMyListedTools(userTools);
      }
      setActiveTab('seller-portal');
      addToast('success', `Welcome, ${user.name}!`, 'Accessing your Seller Management Console.');
    } else {
      setActiveTab('dashboard');
      addToast('success', `Welcome, ${user.name}!`, 'Welcome back to your ToolShed Customer Hub.');
    }
  };

  const handleLogout = () => {
    logOutFirebase().catch(() => {});
    setCurrentUser(null);
    setActiveTab('browse');
    addToast('info', 'Logged Out', 'You have been signed out successfully.');
  };

  const handleSwitchRole = (newRole: UserRole) => {
    if (!currentUser) return;
    const updatedUser: UserProfile = {
      ...currentUser,
      role: newRole,
      businessName:
        newRole === 'seller'
          ? currentUser.businessName || `${currentUser.name}'s Equipment Hire`
          : undefined,
    };
    setCurrentUser(updatedUser);
    syncUserProfile(updatedUser).catch(() => {});

    if (newRole === 'seller') {
      setActiveTab('seller-portal');
      addToast(
        'info',
        'Switched to Seller Mode',
        'Manage tool listings, approve booking requests, and track ZAR earnings.'
      );
    } else {
      setActiveTab('browse');
      addToast(
        'info',
        'Switched to Customer Mode',
        'Browse tools, project kits, and rent equipment in your area.'
      );
    }
  };

  // Filter & Search Logic
  const filteredTools = useMemo(() => {
    return tools
      .filter((tool) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = tool.title.toLowerCase().includes(q);
          const matchesBrand = tool.brand.toLowerCase().includes(q);
          const matchesDesc = tool.description.toLowerCase().includes(q);
          const matchesCategory = tool.category.toLowerCase().includes(q);
          const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(q));
          const matchesCity =
            tool.location.city.toLowerCase().includes(q) ||
            tool.location.neighborhood.toLowerCase().includes(q);
          if (
            !matchesTitle &&
            !matchesBrand &&
            !matchesDesc &&
            !matchesCategory &&
            !matchesTags &&
            !matchesCity
          ) {
            return false;
          }
        }

        // City filter
        if (!selectedCity.includes('All')) {
          const cityName = selectedCity.split(',')[0].trim().toLowerCase();
          const matchesCity =
            tool.location.city.toLowerCase().includes(cityName) ||
            selectedCity.toLowerCase().includes(tool.location.city.toLowerCase());
          if (!matchesCity && tool.location.distanceKm > maxDistance) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
          return false;
        }

        // Max price filter (in ZAR)
        if (tool.dailyRate > maxPrice) {
          return false;
        }

        // Distance filter (in km)
        if (tool.location.distanceKm > maxDistance) {
          return false;
        }

        // Power source filter
        if (selectedPowerSource !== 'All' && tool.powerSource !== selectedPowerSource) {
          return false;
        }

        // Delivery toggle
        if (deliveryOnly && !tool.deliveryAvailable) {
          return false;
        }

        // Instant booking toggle
        if (instantBookingOnly && !tool.instantBooking) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price-high') return b.dailyRate - a.dailyRate;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'distance') return a.location.distanceKm - b.location.distanceKm;
        // Default: Recommended / Featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [
    tools,
    searchQuery,
    selectedCity,
    selectedCategory,
    maxPrice,
    maxDistance,
    selectedPowerSource,
    deliveryOnly,
    instantBookingOnly,
    sortBy,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (maxPrice < 2000) count++;
    if (maxDistance < 50) count++;
    if (selectedPowerSource !== 'All') count++;
    if (deliveryOnly) count++;
    if (instantBookingOnly) count++;
    return count;
  }, [selectedCategory, maxPrice, maxDistance, selectedPowerSource, deliveryOnly, instantBookingOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(2000);
    setMaxDistance(50);
    setSelectedPowerSource('All');
    setDeliveryOnly(false);
    setInstantBookingOnly(false);
    setSearchQuery('');
  };

  // Tool Booking Flow
  const handleQuickBook = (tool: ToolItem) => {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const end = new Date(today);
    end.setDate(today.getDate() + 2);
    const endDate = end.toISOString().split('T')[0];

    setBookingToolConfig({
      tool,
      config: {
        days: 2,
        startDate,
        endDate,
        isDelivery: false,
      },
    });
  };

  const handleBookFromModal = (
    tool: ToolItem,
    config: {
      days: number;
      startDate: string;
      endDate: string;
      isDelivery: boolean;
      safetyGearIncluded?: boolean;
    }
  ) => {
    setSelectedToolForDetail(null);
    setBookingToolConfig({
      tool,
      config,
    });
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    saveBookingToFirestore(newBooking).catch((e) => console.warn('Cloud booking sync notice:', e));
    setMetrics((prev) => ({
      ...prev,
      toolsSharedCount: prev.toolsSharedCount + 1,
      totalSavedRands: prev.totalSavedRands + (newBooking.tool.replacementValue - newBooking.totalPaid),
      co2EmissionsSavedKg: prev.co2EmissionsSavedKg + 15,
    }));

    addToast(
      'success',
      'Equipment Reserved & Saved!',
      `${newBooking.tool.title} reserved for ${newBooking.startDate}. View your Customer Hub for details.`
    );
  };

  // Tool Creation (Lender / Seller)
  const handleToolCreated = (newTool: ToolItem) => {
    setTools((prev) => [newTool, ...prev]);
    setMyListedTools((prev) => [newTool, ...prev]);
    saveToolToFirestore(newTool).catch((e) => console.warn('Cloud tool save notice:', e));

    if (currentUser?.role === 'seller') {
      setActiveTab('seller-portal');
    } else {
      setActiveTab('browse');
    }
    addToast(
      'success',
      'Equipment Published to Cloud!',
      `${newTool.title} is now visible to nearby DIYers and contractors across Mpumalanga.`
    );
  };

  // Seller Portal Actions
  const handleAcceptBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'active' as const } : b))
    );
    updateBookingStatusInFirestore(bookingId, 'active').catch(() => {});
    addToast('success', 'Booking Confirmed!', 'The customer has been notified and pickup instructions were sent.');
  };

  const handleDeclineBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );
    updateBookingStatusInFirestore(bookingId, 'cancelled').catch(() => {});
    addToast('info', 'Booking Declined', 'The reservation request was declined.');
  };

  const handleToggleToolStatus = (toolId: string) => {
    const updated = tools.find((t) => t.id === toolId);
    const newStatus = updated ? !updated.isAvailable : false;

    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, isAvailable: !t.isAvailable } : t))
    );
    setMyListedTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, isAvailable: !t.isAvailable } : t))
    );
    updateToolAvailability(toolId, newStatus).catch(() => {});
    addToast('info', 'Equipment Status Updated', 'Availability was updated for marketplace searches.');
  };

  // Messaging Handlers
  const handleMessageOwner = (tool: ToolItem) => {
    setSelectedToolForDetail(null);

    const existingThread = messages.find((t) => t.toolId === tool.id);
    if (existingThread) {
      setActiveThreadId(existingThread.id);
    } else {
      const newThread: MessageThread = {
        id: `thread-${Date.now()}`,
        toolId: tool.id,
        toolTitle: tool.title,
        toolImage: tool.images[0],
        otherUser: {
          name: tool.owner.name,
          avatar: tool.owner.avatar,
          role: 'owner',
          online: true,
        },
        lastMessage: 'Hello! I am interested in renting your equipment.',
        lastMessageTime: 'Just now',
        unread: false,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'me',
            text: `Hello ${tool.owner.name}! I am interested in renting your ${tool.title}. Is it available this weekend in ${tool.location.neighborhood}, ${tool.location.city}?`,
            timestamp: 'Just now',
          },
        ],
      };
      setMessages((prev) => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
    }
    setIsMessagesOpen(true);
  };

  const handleSendMessage = (threadId: string, text: string) => {
    setMessages((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'me' as const,
            text,
            timestamp: 'Just now',
          };
          return {
            ...thread,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );

    // Simulated auto-reply from owner after 2 seconds
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((thread) => {
          if (thread.id === threadId) {
            const replies = [
              'Great! The equipment is fully serviced and ready with safety accessories.',
              'Yes, pickup at my yard in Ermelo is available at your convenience.',
              'All set! Let me know if you require delivery to your site or have questions on setup.',
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const autoMsg = {
              id: `msg-rep-${Date.now()}`,
              sender: 'them' as const,
              text: randomReply,
              timestamp: 'Just now',
            };
            return {
              ...thread,
              lastMessage: randomReply,
              lastMessageTime: 'Just now',
              messages: [...thread.messages, autoMsg],
            };
          }
          return thread;
        })
      );
      addToast('info', 'New Message Received', 'Tool owner replied to your inquiry.');
    }, 2000);
  };

  const handleMarkBookingComplete = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'completed' as const } : b))
    );
    updateBookingStatusInFirestore(bookingId, 'completed').catch(() => {});
    addToast(
      'success',
      'Rental Completed',
      'Equipment return signed off. Security deposit has been refunded.'
    );
  };

  const handleSaveProfile = async (updatedProfile: UserProfile) => {
    setCurrentUser(updatedProfile);
    try {
      await syncUserProfile(updatedProfile);
    } catch (err) {
      console.error('Failed to sync profile to Firestore:', err);
    }
    addToast(
      'success',
      'Personal Profile Updated',
      'Your contact information and location details have been saved successfully.'
    );
  };

  // If in Seller Portal mode, render standalone-feel console
  if (activeTab === 'seller-portal') {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950">
        <SellerPortal
          user={currentUser || DEMO_USERS[0]}
          myTools={myListedTools}
          bookings={bookings}
          onNavigateToListTool={() => setActiveTab('list-tool')}
          onOpenTool={(t) => setSelectedToolForDetail(t)}
          onAcceptBooking={handleAcceptBooking}
          onDeclineBooking={handleDeclineBooking}
          onMarkBookingComplete={handleMarkBookingComplete}
          onToggleToolStatus={handleToggleToolStatus}
          onExitToMarketplace={() => setActiveTab('browse')}
          onSwitchToCustomerMode={() => handleSwitchRole('customer')}
          onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
        />

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          currentUser={currentUser || DEMO_USERS[0]}
          onSaveProfile={handleSaveProfile}
        />

        {/* Tool Detail Modal if inspected */}
        <ToolDetailModal
          tool={selectedToolForDetail}
          onClose={() => setSelectedToolForDetail(null)}
          onBookNow={handleBookFromModal}
          onMessageOwner={handleMessageOwner}
          openProtectionModal={() => setIsProtectionModalOpen(true)}
        />

        {/* Global Toast Notifications */}
        <ToastNotification toasts={toasts} onDismiss={removeToast} />

        {/* Sticky Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          unreadCount={messages.filter((m) => m.unread).length}
          activeRentalsCount={bookings.filter((b) => b.status === 'active' || b.status === 'upcoming').length}
          openMessages={() => setIsMessagesOpen(true)}
          openAuthModal={(mode, role) => handleOpenAuth(mode || 'login', role || 'customer')}
          onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 font-sans selection:bg-amber-400 selection:text-stone-950 pb-16 lg:pb-0">
      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openMessages={() => setIsMessagesOpen(true)}
        openProtectionModal={() => setIsProtectionModalOpen(true)}
        openEarningsModal={() => setIsEarningsModalOpen(true)}
        openAuthModal={(mode, role) => handleOpenAuth(mode || 'login', role || 'customer')}
        onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        unreadCount={messages.filter((m) => m.unread).length}
        activeRentalsCount={bookings.filter((b) => b.status === 'active' || b.status === 'upcoming').length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: BROWSE TOOLS */}
        {activeTab === 'browse' && (
          <div className="space-y-6 pb-16">
            {/* Hero Section */}
            <HeroBanner
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onExploreProjects={() => setActiveTab('projects')}
              onListTool={() => setActiveTab('list-tool')}
            />

            {/* Marketplace Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
              {/* Filter controls */}
              <ToolFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                maxDistance={maxDistance}
                setMaxDistance={setMaxDistance}
                selectedPowerSource={selectedPowerSource}
                setSelectedPowerSource={setSelectedPowerSource}
                deliveryOnly={deliveryOnly}
                setDeliveryOnly={setDeliveryOnly}
                instantBookingOnly={instantBookingOnly}
                setInstantBookingOnly={setInstantBookingOnly}
                ownerTypeFilter={ownerTypeFilter}
                setOwnerTypeFilter={setOwnerTypeFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onResetFilters={handleResetFilters}
                activeFilterCount={activeFilterCount}
              />

              {/* Tool Cards Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-stone-900">
                    {selectedCategory === 'All'
                      ? `Equipment Available in ${selectedCity}`
                      : `${selectedCategory} Equipment`}
                  </h2>
                  <p className="text-xs text-stone-500 font-medium">
                    Showing {filteredTools.length} verified listings in Ermelo & surrounds
                  </p>
                </div>
              </div>

              {/* Tools Grid */}
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onSelect={(t) => setSelectedToolForDetail(t)}
                      onQuickBook={handleQuickBook}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-4 max-w-lg mx-auto">
                  <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-800">
                    No tools matched your current filters
                  </h3>
                  <p className="text-xs text-stone-500">
                    Try expanding your distance radius, adjusting the category, or clearing the search query.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-stone-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-500 hover:text-stone-950 transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: PROJECT KITS */}
        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
            <ProjectKitsView
              projectKits={projectKits}
              tools={tools}
              onSelectKit={(kit) => setSelectedProjectKit(kit)}
              onSelectTool={(t) => setSelectedToolForDetail(t)}
            />
          </div>
        )}

        {/* VIEW 3: ABOUT VIEW */}
        {activeTab === 'about' && (
          <div className="pb-16 pt-4">
            <AboutView
              onBrowseTools={() => setActiveTab('browse')}
              onOpenSellerPortal={() => {
                if (currentUser?.role === 'seller') {
                  setActiveTab('seller-portal');
                } else if (currentUser) {
                  handleSwitchRole('seller');
                } else {
                  handleOpenAuth('register', 'seller');
                }
              }}
              onOpenProtectionModal={() => setIsProtectionModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 4: CONTACT VIEW */}
        {activeTab === 'contact' && (
          <div className="pb-16 pt-4">
            <ContactView
              onSendMessageSubmitted={(details) => {
                addToast(
                  'success',
                  'Inquiry Sent to Ermelo Hub',
                  `Thank you ${details.name}. Our support team will reply to ${details.email} shortly.`
                );
              }}
            />
          </div>
        )}

        {/* VIEW 5: LIST A TOOL WIZARD */}
        {activeTab === 'list-tool' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
            <ListToolWizard
              onToolCreated={handleToolCreated}
              onCancel={() => setActiveTab(currentUser?.role === 'seller' ? 'seller-portal' : 'browse')}
            />
          </div>
        )}

        {/* VIEW 6: CUSTOMER PORTAL / BORROWER DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
            {currentUser ? (
              <CustomerPortal
                currentUser={currentUser}
                bookings={bookings.map((b) => ({
                  id: b.id,
                  toolId: b.toolId,
                  borrowerName: b.renterName || currentUser.name,
                  borrowerEmail: currentUser.email,
                  borrowerPhone: currentUser.phone || '+27 82 734 9102',
                  ficaNumber: currentUser.idNumberMasked || '890412 5089 088',
                  startDate: b.startDate,
                  endDate: b.endDate,
                  totalDays: b.days,
                  dayRate: b.dailyRate,
                  totalCost: b.totalRental,
                  serviceFee: Math.round(b.totalRental * 0.12),
                  securityDeposit: b.refundableDeposit,
                  deliveryOption: b.deliveryType === 'delivery' ? ('delivery' as const) : ('pickup' as const),
                  deliveryFee: b.deliveryType === 'delivery' ? 150 : 0,
                  totalAmount: b.totalPaid,
                  status: b.status === 'active' || b.status === 'upcoming' ? 'confirmed' : 'completed',
                  paymentMethod: 'Ozow Instant EFT',
                  paymentReference: `OZOW-ERM-${b.id}`,
                  ficaVerified: true,
                  projectType: 'Ermelo Home & Yard Project',
                }))}
                tools={tools}
                onSelectTool={(t) => setSelectedToolForDetail(t)}
                onNavigateToExplore={() => setActiveTab('browse')}
                onOpenProtectionModal={() => setIsProtectionModalOpen(true)}
                onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
              />
            ) : (
              <LenderBorrowerDashboard
                bookings={bookings}
                myListedTools={myListedTools}
                onNavigateToBrowse={() => setActiveTab('browse')}
                onNavigateToListTool={() => setActiveTab('list-tool')}
                onOpenTool={(t) => setSelectedToolForDetail(t)}
                onMarkBookingComplete={handleMarkBookingComplete}
              />
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950 font-black">
                  <Wrench className="w-4 h-4 text-stone-950 stroke-[2.5]" />
                </div>
                <span className="text-lg font-black text-white font-heading">
                  Tool<span className="text-amber-400">Shed</span>{' '}
                  <span className="text-xs bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded font-black">SA</span>
                </span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                South Africa's trusted equipment sharing marketplace. Connecting tool owners, plant hire, and local contractors across Ermelo and Mpumalanga.
              </p>
              <p className="text-[11px] text-stone-500">
                Operating out of Ermelo, 2350, Mpumalanga, South Africa.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Community Portals</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveTab('browse')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Browse Equipment
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('projects')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Project Kits & Blueprints
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (currentUser?.role === 'seller') {
                        setActiveTab('seller-portal');
                      } else {
                        handleSwitchRole('seller');
                      }
                    }}
                    className="hover:text-amber-400 transition-colors cursor-pointer font-semibold text-amber-300"
                  >
                    Seller & Plant Hire Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsEarningsModalOpen(true)} className="hover:text-amber-400 transition-colors cursor-pointer">
                    ZAR ROI Earnings Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('list-tool')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    List Equipment & Earn
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Trust & Verification</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setIsProtectionModalOpen(true)} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Damage Guarantee Policy
                  </button>
                </li>
                <li>
                  <span className="text-stone-400">FICA & RSA ID Verification</span>
                </li>
                <li>
                  <span className="text-stone-400">Ozow & Capitec Secure Payments</span>
                </li>
                <li>
                  <button onClick={() => setActiveTab('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Ermelo Regional Support
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">About & Sustainability</h4>
              <p className="leading-relaxed text-stone-400">
                Access is more valuable than ownership. By sharing equipment across Mpumalanga, ToolShed prevents unnecessary purchases, reduces carbon emissions, and supports local economic development.
              </p>
              <div className="mt-3 flex items-center gap-2 text-emerald-400 font-bold">
                <Leaf className="w-4 h-4" />
                <span>Over 19,000 kg CO₂ Offset</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
            <p>© {new Date().getFullYear()} ToolShed South Africa (Pty) Ltd. Based in Ermelo, Mpumalanga.</p>
            <div className="flex gap-4">
              <span>Access is more valuable than ownership.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      {/* 1. Auth Modal (Login / Register / Role Switching) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        initialRole={authModalRole}
      />

      {/* 2. Tool Detail Modal */}
      <ToolDetailModal
        tool={selectedToolForDetail}
        onClose={() => setSelectedToolForDetail(null)}
        onBookNow={handleBookFromModal}
        onMessageOwner={handleMessageOwner}
        openProtectionModal={() => setIsProtectionModalOpen(true)}
      />

      {/* 3. Checkout / Booking Modal */}
      {bookingToolConfig && (
        <BookingModal
          tool={bookingToolConfig.tool}
          bookingConfig={bookingToolConfig.config}
          onClose={() => setBookingToolConfig(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* 4. Project Kit Blueprint Modal */}
      <ProjectKitModal
        kit={selectedProjectKit}
        tools={tools}
        onClose={() => setSelectedProjectKit(null)}
        onSelectTool={(t) => setSelectedToolForDetail(t)}
      />

      {/* 5. Messages Drawer */}
      <MessagesDrawer
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
        threads={messages}
        onSendMessage={handleSendMessage}
        activeThreadId={activeThreadId}
        setActiveThreadId={setActiveThreadId}
      />

      {/* 6. Damage Guarantee Policy Modal */}
      <ProtectionGuaranteeModal
        isOpen={isProtectionModalOpen}
        onClose={() => setIsProtectionModalOpen(false)}
      />

      {/* 7. Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        currentUser={currentUser || DEMO_USERS[0]}
        onSaveProfile={handleSaveProfile}
      />

      {/* 8. Earnings ROI Calculator Modal */}
      <EarningsCalculatorModal
        isOpen={isEarningsModalOpen}
        onClose={() => setIsEarningsModalOpen(false)}
        onStartListing={() => {
          setIsEarningsModalOpen(false);
          setActiveTab('list-tool');
        }}
      />

      {/* Global Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        unreadCount={messages.filter((m) => m.unread).length}
        activeRentalsCount={bookings.filter((b) => b.status === 'active' || b.status === 'upcoming').length}
        openMessages={() => setIsMessagesOpen(true)}
        openAuthModal={(mode, role) => handleOpenAuth(mode || 'login', role || 'customer')}
        onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
      />
    </div>
  );
}
