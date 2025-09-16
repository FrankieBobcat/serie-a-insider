import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { quizQuestions } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaTrophy, FaGamepad, FaEnvelope, FaPhone, FaCommentAlt } from "react-icons/fa";

const FanZone = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("quiz");
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<{
    correctAnswers: number;
    totalQuestions: number;
    showResults: boolean;
  }>({
    correctAnswers: 0,
    totalQuestions: quizQuestions.length,
    showResults: false,
  });
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  
  // Newsletter state
  const [newsletterFormData, setNewsletterFormData] = useState({
    email: "",
    firstName: "",
    favoriteTeam: "",
  });
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  
  // Contact form state
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  
  // Current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Handle quiz answer submission
  const handleQuizSubmit = async () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You need to select an answer to submit.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmittingQuiz(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    try {
      // Submit answer to backend
      await apiRequest("POST", "/api/quiz/submit", {
        questionId: currentQuestion.id,
        answer: selectedAnswer,
        isCorrect,
        userIdentifier: "anonymous" // In a real app, this would be a session ID or user ID
      });
      
      // Show feedback to user
      toast({
        title: isCorrect ? "Correct!" : "Incorrect!",
        description: isCorrect
          ? `Good job! ${currentQuestion.explanation}`
          : `The correct answer is ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`,
        variant: isCorrect ? "default" : "destructive",
      });
      
      // Update results
      if (isCorrect) {
        setQuizResults(prev => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1
        }));
      }
      
      // Move to next question or show results
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizResults(prev => ({
          ...prev,
          showResults: true
        }));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingQuiz(false);
    }
  };
  
  // Handle newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterFormData.email || !newsletterFormData.firstName || !newsletterFormData.favoriteTeam || !newsletterConsent) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields and agree to the terms.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmittingNewsletter(true);
    
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", newsletterFormData);
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      // Reset form
      setNewsletterFormData({
        email: "",
        firstName: "",
        favoriteTeam: "",
      });
      setNewsletterConsent(false);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };
  
  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactFormData.name || !contactFormData.email || !contactFormData.subject || !contactFormData.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields in the contact form.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmittingContact(true);
    
    try {
      await apiRequest("POST", "/api/contact/submit", contactFormData);
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setContactFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizResults({
      correctAnswers: 0,
      totalQuestions: quizQuestions.length,
      showResults: false,
    });
  };

  return (
    <>
      <Helmet>
        <title>Fan Zone | Serie A Insider</title>
        <meta
          name="description"
          content="Test your Serie A knowledge with quizzes, subscribe to our newsletter for updates, and connect with other fans of Italian football."
        />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-serie-navy to-serie-blue text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold font-heading text-center mb-4">Fan Zone</h1>
            <p className="text-serie-gray text-center max-w-3xl mx-auto">
              Connect with Serie A Insider through quizzes, newsletters, and more. Test your knowledge
              of Italian football and stay up-to-date with the latest news and events.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="quiz" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="quiz" className="font-accent">
                  <FaGamepad className="mr-2" /> Quiz & Trivia
                </TabsTrigger>
                <TabsTrigger value="newsletter" className="font-accent">
                  <FaEnvelope className="mr-2" /> Newsletter
                </TabsTrigger>
                <TabsTrigger value="contact" className="font-accent">
                  <FaCommentAlt className="mr-2" /> Contact Us
                </TabsTrigger>
              </TabsList>

              {/* Quiz & Trivia */}
              <TabsContent value="quiz" className="mt-6">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-serie-navy to-serie-blue text-white">
                    <CardTitle>Test Your Serie A Knowledge</CardTitle>
                    <CardDescription className="text-serie-gray">
                      Challenge yourself with our Serie A trivia and compete with other fans.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {!quizResults.showResults ? (
                      <div>
                        <h3 className="font-bold font-heading text-lg text-serie-navy mb-4">
                          Question {currentQuestionIndex + 1} of {quizQuestions.length}: {currentQuestion.question}
                        </h3>
                        
                        <RadioGroup 
                          value={selectedAnswer || ""} 
                          onValueChange={setSelectedAnswer}
                          className="space-y-3"
                        >
                          {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center p-3 border rounded hover:bg-serie-gray/10 transition">
                              <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
                              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-20 h-20 bg-serie-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaTrophy className="text-4xl text-serie-blue" />
                        </div>
                        <h3 className="text-2xl font-bold font-heading text-serie-navy mb-2">
                          Quiz Complete!
                        </h3>
                        <p className="text-gray-600 mb-4">
                          You got {quizResults.correctAnswers} out of {quizResults.totalQuestions} questions correct.
                        </p>
                        <div className="mb-6">
                          {quizResults.correctAnswers === quizResults.totalQuestions ? (
                            <div className="bg-serie-green/10 text-serie-green p-3 rounded-lg">
                              Perfect score! You're a true Serie A expert!
                            </div>
                          ) : quizResults.correctAnswers >= quizResults.totalQuestions / 2 ? (
                            <div className="bg-serie-blue/10 text-serie-blue p-3 rounded-lg">
                              Good job! You know your Serie A quite well!
                            </div>
                          ) : (
                            <div className="bg-serie-red/10 text-serie-red p-3 rounded-lg">
                              Keep trying! There's more to learn about Serie A!
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={resetQuiz}
                          className="bg-serie-blue hover:bg-serie-navy"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {!quizResults.showResults && (
                    <CardFooter className="flex justify-between border-t pt-6">
                      <div>
                        <span className="text-sm text-gray-500">25,432 fans have played today</span>
                      </div>
                      <Button 
                        onClick={handleQuizSubmit} 
                        disabled={isSubmittingQuiz || !selectedAnswer}
                        className="bg-serie-light-blue hover:bg-serie-navy"
                      >
                        {isSubmittingQuiz ? "Submitting..." : "Submit Answer"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
                
                {/* More Trivia Games */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold font-heading text-serie-navy mb-6">More Fan Challenges</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition cursor-pointer">
                      <CardHeader className="bg-serie-blue text-white">
                        <CardTitle className="text-lg">Guess the Player</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-gray-600 mb-4">Test your knowledge of Serie A stars past and present.</p>
                        <Button className="w-full">Play Now</Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition cursor-pointer">
                      <CardHeader className="bg-serie-red text-white">
                        <CardTitle className="text-lg">Serie A Legends</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-gray-600 mb-4">How well do you know the greatest players in Serie A history?</p>
                        <Button className="w-full">Play Now</Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition cursor-pointer">
                      <CardHeader className="bg-serie-green text-white">
                        <CardTitle className="text-lg">Stadium Challenge</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-gray-600 mb-4">Can you identify all the stadiums of Serie A teams?</p>
                        <Button className="w-full">Play Now</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Newsletter */}
              <TabsContent value="newsletter" className="mt-6">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-serie-blue to-serie-light-blue text-white">
                    <CardTitle>Stay Updated with Serie A Insider</CardTitle>
                    <CardDescription className="text-serie-gray">
                      Get the latest news, match previews, and exclusive content directly to your inbox.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form className="space-y-4" onSubmit={handleNewsletterSubmit}>
                      <div>
                        <Label htmlFor="email" className="block mb-2 font-accent text-serie-navy">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={newsletterFormData.email}
                          onChange={(e) => setNewsletterFormData({ ...newsletterFormData, email: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="block mb-2 font-accent text-serie-navy">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            value={newsletterFormData.firstName}
                            onChange={(e) => setNewsletterFormData({ ...newsletterFormData, firstName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="favoriteTeam" className="block mb-2 font-accent text-serie-navy">
                            Favorite Team
                          </Label>
                          <select
                            id="favoriteTeam"
                            className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            value={newsletterFormData.favoriteTeam}
                            onChange={(e) => setNewsletterFormData({ ...newsletterFormData, favoriteTeam: e.target.value })}
                          >
                            <option value="">Select a team</option>
                            <option value="AC Milan">AC Milan</option>
                            <option value="Inter">Inter</option>
                            <option value="Juventus">Juventus</option>
                            <option value="Napoli">Napoli</option>
                            <option value="Roma">Roma</option>
                            <option value="Lazio">Lazio</option>
                            <option value="Atalanta">Atalanta</option>
                            <option value="Fiorentina">Fiorentina</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="consent"
                          className="mt-1 mr-2"
                          checked={newsletterConsent}
                          onChange={(e) => setNewsletterConsent(e.target.checked)}
                        />
                        <Label htmlFor="consent" className="text-sm text-gray-600">
                          I agree to receive newsletters and marketing communications from Serie A Insider. You can
                          unsubscribe at any time.
                        </Label>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-serie-navy hover:bg-serie-blue"
                        disabled={isSubmittingNewsletter}
                      >
                        {isSubmittingNewsletter ? "Subscribing..." : "Subscribe Now"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Newsletter Benefits */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold font-heading text-serie-navy mb-6">Newsletter Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 bg-serie-blue/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </div>
                        <h3 className="font-bold font-heading text-serie-navy mb-2">Exclusive Content</h3>
                        <p className="text-gray-600">
                          Get articles, interviews, and analysis not available on the website.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 bg-serie-blue/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="font-bold font-heading text-serie-navy mb-2">Early Access</h3>
                        <p className="text-gray-600">
                          Be the first to know about breaking news and transfer rumors.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 bg-serie-blue/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="font-bold font-heading text-serie-navy mb-2">Special Offers</h3>
                        <p className="text-gray-600">
                          Subscriber-only discounts on merchandise and event tickets.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Contact Us */}
              <TabsContent value="contact" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Serie A Insider</CardTitle>
                      <CardDescription>
                        Have a question or suggestion? We'd love to hear from you!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4" onSubmit={handleContactSubmit}>
                        <div>
                          <Label htmlFor="contactName" className="block mb-2">Name</Label>
                          <Input 
                            id="contactName" 
                            placeholder="Your name" 
                            value={contactFormData.name}
                            onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactEmail" className="block mb-2">Email</Label>
                          <Input 
                            id="contactEmail" 
                            type="email" 
                            placeholder="your@email.com" 
                            value={contactFormData.email}
                            onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactSubject" className="block mb-2">Subject</Label>
                          <Input 
                            id="contactSubject" 
                            placeholder="How can we help?" 
                            value={contactFormData.subject}
                            onChange={(e) => setContactFormData({...contactFormData, subject: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactMessage" className="block mb-2">Message</Label>
                          <Textarea 
                            id="contactMessage" 
                            placeholder="Your message..." 
                            rows={5} 
                            value={contactFormData.message}
                            onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-serie-blue hover:bg-serie-navy"
                          disabled={isSubmittingContact}
                        >
                          {isSubmittingContact ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Get In Touch</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">
                              <FaEnvelope className="text-serie-blue text-xl" />
                            </div>
                            <div>
                              <h3 className="font-bold text-serie-navy mb-1">Email Us</h3>
                              <p className="text-gray-600">contact@serieainsider.com</p>
                              <p className="text-gray-600 text-sm">We aim to respond within 24 hours</p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">
                              <FaPhone className="text-serie-blue text-xl" />
                            </div>
                            <div>
                              <h3 className="font-bold text-serie-navy mb-1">Call Us</h3>
                              <p className="text-gray-600">+1 (555) 123-4567</p>
                              <p className="text-gray-600 text-sm">Mon-Fri, 9am-5pm CET</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Follow Us</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Stay connected with Serie A Insider through our social media channels for the latest updates.
                        </p>
                        <div className="flex space-x-4">
                          <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition text-white"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition text-white"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition text-white"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition text-white"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-12 bg-serie-gray/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-serie-navy text-center mb-4">Join Our Community</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
              Connect with fellow Serie A fans from around the world to discuss matches, players, and everything related to Italian football.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center hover:shadow-lg transition">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto bg-serie-blue/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="font-bold font-heading text-lg text-serie-navy mb-2">Forum</h3>
                  <p className="text-gray-600 mb-4">
                    Discuss tactics, transfer rumors, and post-match analysis with other fans.
                  </p>
                  <Button className="bg-serie-blue hover:bg-serie-navy">
                    Join Discussion
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto bg-serie-blue/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold font-heading text-lg text-serie-navy mb-2">Events</h3>
                  <p className="text-gray-600 mb-4">
                    Join watch parties and meetups with other Serie A fans in your area.
                  </p>
                  <Button className="bg-serie-blue hover:bg-serie-navy">
                    Find Events
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto bg-serie-blue/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-serie-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold font-heading text-lg text-serie-navy mb-2">Live Streams</h3>
                  <p className="text-gray-600 mb-4">
                    Join our pre and post-match analysis shows with Serie A experts.
                  </p>
                  <Button className="bg-serie-blue hover:bg-serie-navy">
                    Watch Live
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FanZone;
