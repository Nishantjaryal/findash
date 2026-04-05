import { useFinance, Role } from "@/context/FinanceContext";
import { Shield, Eye } from "lucide-react";

const RoleToggle = () => {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-lg bg-secondary">
      {(["admin", "viewer"] as Role[]).map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            role === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {r === "admin" ? <Shield className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {r.charAt(0).toUpperCase() + r.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RoleToggle;
