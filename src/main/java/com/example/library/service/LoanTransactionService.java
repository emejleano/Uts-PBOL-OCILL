package com.example.library.service;

import com.example.library.model.LoanTransaction;
import com.example.library.repository.LoanTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
@Service
public class LoanTransactionService {
    @Autowired
    private LoanTransactionRepository loanTransactionRepository;

    public List<LoanTransaction> getAllLoanTransactions() {
        return loanTransactionRepository.findAll();
    }

    public LoanTransaction saveLoanTransaction(LoanTransaction transaction) {
        return loanTransactionRepository.save(transaction);
    }

    public void deleteLoanTransaction(Long id) {
        loanTransactionRepository.deleteById(id);
    }

    public Optional<LoanTransaction> getLoanTransactionById(Long id) {
        return loanTransactionRepository.findById(id);
    }
}
