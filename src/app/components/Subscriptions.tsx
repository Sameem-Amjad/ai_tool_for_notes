import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { mockUsers } from "../lib/mockData";
import {
  DollarSign,
  Users,
  TrendingUp,
  Check,
  Crown,
  Zap,
  Star,
} from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  users: number;
  color: string;
  icon: React.ReactNode;
  gradient: string;
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  plan: string;
  amount: number;
  date: string;
}

export function Subscriptions() {
  const plans: SubscriptionPlan[] = [
    {
      id: "basic",
      name: "Basic",
      price: 4.99,
      features: [
        "Up to 50 notes/month",
        "Basic AI models",
        "Text input only",
        "Email support",
        "5GB storage",
      ],
      users: 4249,
      color: "text-gray-600",
      icon: <Check className="w-6 h-6" />,
      gradient: "from-gray-400 to-gray-600",
    },
    {
      id: "premium",
      name: "Premium",
      price: 12.99,
      features: [
        "Unlimited notes",
        "Premium AI models",
        "All input types",
        "Priority support",
        "50GB storage",
        "Advanced analytics",
      ],
      users: 5123,
      color: "text-blue-600",
      icon: <Crown className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: "platinum",
      name: "Platinum",
      price: 29.99,
      features: [
        "Everything in Premium",
        "Highest-tier AI models",
        "API access",
        "24/7 priority support",
        "Unlimited storage",
        "Custom integrations",
        "Dedicated account manager",
      ],
      users: 3111,
      color: "text-purple-600",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: "t1",
      userId: "1",
      userName: "Emma Johnson",
      plan: "Premium",
      amount: 12.99,
      date: "2026-03-02T10:30:00Z",
    },
    {
      id: "t2",
      userId: "2",
      userName: "Michael Smith",
      plan: "Platinum",
      amount: 29.99,
      date: "2026-03-02T08:15:00Z",
    },
    {
      id: "t3",
      userId: "3",
      userName: "Sarah Williams",
      plan: "Premium",
      amount: 12.99,
      date: "2026-03-02T06:45:00Z",
    },
    {
      id: "t4",
      userId: "4",
      userName: "David Brown",
      plan: "Platinum",
      amount: 29.99,
      date: "2026-03-01T20:30:00Z",
    },
    {
      id: "t5",
      userId: "5",
      userName: "Lisa Anderson",
      plan: "Basic",
      amount: 4.99,
      date: "2026-03-01T18:20:00Z",
    },
  ];

  const totalUsers = plans.reduce((acc, plan) => acc + plan.users, 0);
  const monthlyRevenue = plans.reduce(
    (acc, plan) => acc + plan.users * plan.price,
    0
  );
  const retentionRate = 92.5;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Monthly Revenue
            </CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ${monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-green-600 font-medium">+13.2%</span> from
              last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Subscribers
            </CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {totalUsers.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-blue-600 font-medium">+8.3%</span> from last
              month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Retention Rate
            </CardTitle>
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {retentionRate}%
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-purple-600 font-medium">+2.1%</span> from
              last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Distribution</CardTitle>
          <CardDescription>Current subscriber breakdown by plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {plans.map((plan) => {
              const percentage = ((plan.users / totalUsers) * 100).toFixed(1);
              return (
                <div key={plan.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${plan.gradient}`}
                      >
                        <div className="text-white">{plan.icon}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">
                            {plan.name}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            ${plan.price}/month
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {plan.users.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {percentage}%
                      </p>
                      <p className="text-sm text-gray-500">
                        ${(plan.users * plan.price).toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                  <Progress value={Number(percentage)} className="h-3" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden ${
              plan.id === "premium" ? "border-blue-500 border-2" : ""
            }`}
          >
            {plan.id === "premium" && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
            )}
            <CardHeader>
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-4`}
              >
                <div className="text-white">{plan.icon}</div>
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <div className="text-sm text-gray-600 mb-2">
                  {plan.users.toLocaleString()} active users
                </div>
                <Button
                  className={`w-full ${
                    plan.id === "premium"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  }`}
                  variant={plan.id === "premium" ? "default" : "outline"}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest subscription payments and renewals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => {
              const planColors: Record<string, string> = {
                Basic: "bg-gray-100 text-gray-800",
                Premium: "bg-blue-100 text-blue-800",
                Platinum: "bg-purple-100 text-purple-800",
              };

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {getInitials(transaction.userName)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.userName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            planColors[transaction.plan] || ""
                          }`}
                        >
                          {transaction.plan}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
