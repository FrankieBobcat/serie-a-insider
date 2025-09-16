import { useState } from "react";
import { quizQuestions, teams } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const FanEngagement = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Get the first question from our quiz data
  const currentQuestion = quizQuestions[0];

  const handleQuizSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You need to select an answer to submit.",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    toast({
      title: isCorrect ? "Correct!" : "Incorrect!",
      description: isCorrect 
        ? `Good job! ${currentQuestion.explanation}` 
        : `The correct answer is ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !firstName || !favoriteTeam || !consent) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields and agree to the terms.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", {
        email,
        firstName,
        favoriteTeam,
      });
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      // Reset form
      setEmail("");
      setFirstName("");
      setFavoriteTeam("");
      setConsent(false);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-serie-gray/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quiz section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-serie-navy to-serie-blue text-white p-6">
              <h2 className="text-2xl font-bold font-heading mb-2">Test Your Serie A Knowledge</h2>
              <p className="text-serie-gray">Challenge yourself with our Serie A trivia and compete with other fans.</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold font-heading text-lg text-serie-navy mb-4">
                  Daily Question: {currentQuestion.question}
                </h3>
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border rounded hover:bg-serie-gray/10 cursor-pointer transition"
                      onClick={() => setSelectedAnswer(option)}
                    >
                      <input
                        type="radio"
                        name="quiz-answer"
                        id={`answer${index + 1}`}
                        className="mr-3"
                        checked={selectedAnswer === option}
                        onChange={() => setSelectedAnswer(option)}
                      />
                      <label htmlFor={`answer${index + 1}`} className="cursor-pointer flex-grow">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">25,432 fans have played today</span>
                </div>
                <button
                  className="bg-serie-light-blue hover:bg-serie-navy text-white px-4 py-2 rounded font-accent transition"
                  onClick={handleQuizSubmit}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-serie-blue to-serie-light-blue text-white p-6">
              <h2 className="text-2xl font-bold font-heading mb-2">Stay Updated with Serie A Insider</h2>
              <p className="text-serie-gray">Get the latest news, match previews, and exclusive content directly to your inbox.</p>
            </div>
            <div className="p-6">
              <form className="space-y-4" onSubmit={handleNewsletterSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 font-accent text-serie-navy">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-serie-gray rounded focus:outline-none focus:ring-2 focus:ring-serie-light-blue"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 font-accent text-serie-navy">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full p-3 border border-serie-gray rounded focus:outline-none focus:ring-2 focus:ring-serie-light-blue"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="favoriteTeam" className="block mb-2 font-accent text-serie-navy">
                      Favorite Team
                    </label>
                    <select
                      id="favoriteTeam"
                      className="w-full p-3 border border-serie-gray rounded focus:outline-none focus:ring-2 focus:ring-serie-light-blue"
                      value={favoriteTeam}
                      onChange={(e) => setFavoriteTeam(e.target.value)}
                    >
                      <option value="">Select a team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.name}>
                          {team.name}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 mr-2"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    I agree to receive newsletters and marketing communications from Serie A Insider. You can unsubscribe
                    at any time.
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-serie-navy hover:bg-serie-blue text-white py-3 rounded font-accent transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanEngagement;
