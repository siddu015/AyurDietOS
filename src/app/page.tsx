import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-secondary">Ayur</span>
          <span className="text-primary">Diet</span>
          <span className="text-stone"> OS</span>
        </h1>
        <p className="text-xl text-stone max-w-2xl mx-auto">
          Intelligent diet planning that combines ancient Ayurvedic wisdom 
          with modern nutritional science
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        <FeatureCard
          title="ANH-Score Algorithm"
          description="Hybrid scoring system that evaluates foods based on both Ayurvedic compatibility and nutritional value"
          icon="A"
          color="bg-primary"
        />
        <FeatureCard
          title="Smart Meal Composer"
          description="AI-powered meal generation using constraint satisfaction to balance doshas, tastes, and nutrients"
          icon="M"
          color="bg-secondary"
        />
        <FeatureCard
          title="Viruddha Aahara Check"
          description="Automatic detection of incompatible food combinations based on classical Ayurvedic texts"
          icon="V"
          color="bg-accent"
        />
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <Link
          href="/patient/onboarding"
          className="btn btn-primary text-lg px-8"
        >
          Start as Patient
        </Link>
        <Link
          href="/doctor/dashboard"
          className="btn btn-outline text-lg px-8"
        >
          Doctor Dashboard
        </Link>
      </div>

      {/* Info Section */}
      <div className="mt-16 grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-3 text-secondary">For Patients</h3>
          <ul className="space-y-2 text-sm text-stone">
            <li className="flex items-center gap-2">
              <span className="text-secondary">*</span>
              Discover your Prakriti (body constitution)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondary">*</span>
              Get personalized food recommendations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondary">*</span>
              View ANH scores for any food item
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondary">*</span>
              Track your diet plans
            </li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-3 text-primary">For Doctors</h3>
          <ul className="space-y-2 text-sm text-stone">
            <li className="flex items-center gap-2">
              <span className="text-primary">*</span>
              Create customized diet plans
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">*</span>
              Auto-generate balanced meals
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">*</span>
              Get Viruddha Aahara warnings
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">*</span>
              Visualize food-condition relationships
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  title, 
  description, 
  icon, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: string; 
  color: string;
}) {
  return (
    <div className="card p-6 text-center">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        <span className="text-2xl font-bold text-white">{icon}</span>
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-stone">{description}</p>
    </div>
  );
}
