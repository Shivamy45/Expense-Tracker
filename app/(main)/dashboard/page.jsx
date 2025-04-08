import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  try {
    const [accounts = [], transactions = []] = await Promise.all([
      getUserAccounts().catch(() => []),
      getDashboardData().catch(() => []),
    ]);

    const defaultAccount = accounts?.find((account) => account.isDefault);

    // Get budget for default account
    let budgetData = null;
    if (defaultAccount) {
      try {
        budgetData = await getCurrentBudget(defaultAccount.id);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    }

    return (
      <div className="space-y-8">
        {/* Budget Progress */}
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />

        {/* Dashboard Overview */}
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />

        {/* Accounts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
          {accounts?.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Unable to load dashboard data. Please try again later.</p>
      </div>
    );
  }
}
